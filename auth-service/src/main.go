package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net"
	"strconv"

	pb "wehelp_goservice/grpc"

	"github.com/go-sql-driver/mysql"
	"google.golang.org/grpc"
)

var cfg = mysql.Config{
	User:                 "root",
	Passwd:               "example_password",
	Net:                  "tcp",
	Addr:                 "mariadb-database:3306",
	DBName:               "usersdb",
	AllowNativePasswords: true,
}

type USER struct {
	Id       int
	Name     string
	Email    string
	Password string
	isHelper []uint8
}
type server struct {
	pb.SplitterAuthServer
}

func deleteOldSessions() {
	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	res, err := db.Exec("DELETE FROM user_sessions WHERE creationDate < (NOW() - INTERVAL 10 MINUTE)")
	if err != nil {
		println(res, err.Error())
	}

}

func generateSession(userId int) string {
	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	defer deleteOldSessions()
	var session_id int64
	res, err := db.Exec("INSERT INTO user_sessions (id, creationDate) VALUES (?, NOW())", userId)
	if err != nil {
		println(err.Error())
	}
	if err != nil {
		rows := db.QueryRow("SELECT session_id FROM user_sessions WHERE id = ?", userId)
		err = rows.Scan(&session_id)
		if err != nil {
			log.Fatal("can't get session_id of user")
		}
		return strconv.Itoa(int(session_id))

	}
	session_id, err = res.LastInsertId()

	if err != nil {
		log.Fatal("something went wrong")
	}

	return strconv.Itoa(int(session_id))

}

func (s *server) Register(ctx context.Context, request *pb.RegisterRequest) (*pb.AuthResponse, error) {
	defer deleteOldSessions()

	var isHelper int
	if request.IsHelper {
		isHelper = 1
	} else {
		isHelper = 0
	}
	println("Register request:", request.Email, request.Name, request.Password, isHelper)
	var response *pb.AuthResponse = &pb.AuthResponse{}
	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	res, err := db.Exec("INSERT INTO users ( name, email, password, isHelper) VALUES ( ?, ?, ?, ? )", request.Name, request.Email, request.Password, isHelper)
	if err != nil {
		response.UserId = ""
		response.Success = false
		response.SessionId = ""
		return response, nil
	}

	//var user USER
	id, err := res.LastInsertId()
	if err != nil {
		response.UserId = ""
		response.Success = false
		response.SessionId = ""
		return response, nil
	}
	response.Success = true
	response.UserId = strconv.Itoa(int(id))
	println("id :", response.UserId)
	response.SessionId = generateSession(int(id))
	return response, nil
}
func (s *server) Login(ctx context.Context, request *pb.LoginRequest) (*pb.AuthResponse, error) {
	println("login request", request.Email, request.Password)
	var response pb.AuthResponse
	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()
	defer deleteOldSessions()
	row := db.QueryRow("SELECT id FROM usersdb.users WHERE email=? AND password=?", request.Email, request.Password)
	if row.Err() != nil {
		println(row.Err().Error())
		response.Success = false
		response.SessionId = ""
		response.UserId = ""
		return &response, nil
	}
	var userId int
	row.Scan(&userId)
	if userId == 0 {
		response.Success = false
		response.SessionId = ""
		response.UserId = ""
		return &response, nil
	}
	response.UserId = strconv.Itoa(userId)
	response.Success = true
	response.SessionId = generateSession(userId)
	return &response, nil
}

func main() {

	db, err := sql.Open("mysql", cfg.FormatDSN())

	if err != nil {
		log.Fatal(err)
		return
	}
	defer db.Close()

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", 4011))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterSplitterAuthServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
