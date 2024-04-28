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

type server struct {
	pb.PostServiceServer
}

var cfg = mysql.Config{
	User:                 "root",
	Passwd:               "example_password",
	Net:                  "tcp",
	Addr:                 "mariadb-database:3306",
	DBName:               "usersdb",
	AllowNativePasswords: true,
}

func (s *server) CreatePost(ctx context.Context, request *pb.Post) (*pb.Result, error) {
	println("Create post request", request.UserId, request.Header, request.Text, request.Type)
	result := pb.Result{}
	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {

		log.Fatal(err)
	}
	defer db.Close()
	res, err := db.Exec("INSERT INTO posts (userId, header, text, type, creationDate) VALUES (?, ?, ?, ?, NOW())", request.UserId, request.Header, request.Text, request.Type)
	if err != nil {
		println(err.Error())
		return &result, nil
	}
	postid, err := res.LastInsertId()
	if err != nil {
		println(err.Error())
		return &result, nil
	}
	result.Id = strconv.Itoa(int(postid))
	return &result, nil
}

func main() {
	db, err := sql.Open("mysql", cfg.FormatDSN())

	if err != nil {
		log.Fatal(err)
		return
	}
	defer db.Close()

	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", 4012))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterPostServiceServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
