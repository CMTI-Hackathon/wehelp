package main

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"net/http/httputil"
	pb "wehelp_goservice/grpc"

	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/protobuf/encoding/protojson"
)

type registerData struct {
	Username, Password, Email string
	IsHelper                  bool
}

func registerUser(w http.ResponseWriter, r *http.Request) {
	println("SomeRequest", r.URL.Path)
	res, err := httputil.DumpRequest(r, true)
	if r.Method != "POST" {
		w.Write([]byte("{\"succes\" : false}"))
		return
	}
	if err == nil {
		println(string(res))
	}

	conn, err := grpc.Dial("auth-service:4011", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		println("error:", err)
	}
	client := pb.NewSplitterAuthClient(conn)
	var jsonRequest registerData
	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.Write([]byte("{\"succes\" : false}"))
		return
	}
	err = json.Unmarshal(body, &jsonRequest)
	if err != nil {
		w.Write([]byte("{\"succes\" : false}"))
		println(err)
		return
	}
	var request pb.RegisterRequest
	request.Name = jsonRequest.Username
	request.Email = jsonRequest.Email
	request.Password = jsonRequest.Password
	request.IsHelper = jsonRequest.IsHelper
	response, err := client.Register(context.Background(), &request)
	if err != nil {
		w.Write([]byte("{\"succes\" : false}"))
		println(err.Error())
		return
	}
	answer, err := protojson.Marshal(response)
	if err != nil {
		w.Write([]byte("{\"succes\" : false}"))
		return
	}
	w.Write(answer)

}
func main() {
	http.HandleFunc("/api/registerUser", registerUser)
	log.Fatal(http.ListenAndServe(":4010", nil))

}
