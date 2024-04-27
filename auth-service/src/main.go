package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net"

	pb "wehelp_goservice/grpc"

	"github.com/go-sql-driver/mysql"
	"google.golang.org/grpc"
)

var db *sql.DB

type BitBool bool
type USER struct {
	Id       int
	Name     string
	Email    string
	Password string
	isHelper []uint8
}
type server struct {
	pb.AuthServer
}

func generateSession(userId string) int32 {
	return 1
}
func sessionExist(userId string, sessionId string) bool {
	return true
}
func (s *server) Register(ctx context.Context, request *pb.RegisterRequest) (*pb.AuthResponse, error) {
	var response pb.AuthResponse
	println("Register request:", request.Email, request.Name, request.Password, request.IsHelper)
	_, err := db.Exec("INSERT INTO users ( name, email, password, isHelper) VALUES ( '?', '?', '?', '?' )", request.Name, request.Email, request.Password, request.IsHelper)
	if err != nil {
		response.Succes = false
		response.SessionId = ""
		response.UserId = ""
	}

	return &response, nil
}
func main() {
	cfg := mysql.Config{
		User:                 "root",
		Passwd:               "example_password",
		Net:                  "tcp",
		Addr:                 "mariadb_database:3306",
		DBName:               "usersdb",
		AllowNativePasswords: true,
	}
	db, err := sql.Open("mysql", cfg.FormatDSN())

	if err != nil {
		log.Fatal(err)
		return
	}
	defer db.Close()

	println("connected to db")
	//res, err := db.Exec("INSERT INTO users ( name, email, password, isHelper) VALUES ('Someone', 'noone@email.com', 'qwerty', 1 )")
	if err != nil {
		log.Fatal(err)
		return
	}
	//println(res)
	rows, err := db.Query("SELECT * FROM usersdb.users;")
	var user USER
	if err != nil {
		log.Fatal(err)
		return
	}
	for rows.Next() {
		err = rows.Scan(&user.Id, &user.Name, &user.Email, &user.Password, &user.isHelper)
		if err != nil {
			log.Fatal(err)
			continue
		}
		println(user.Name, user.Email)
	}
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", 4011))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterAuthServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

}
