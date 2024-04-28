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
type loginData struct {
	Email, Password string
}

func loginUser(w http.ResponseWriter, r *http.Request) {
	println("New login request")
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

	var jsonRequest loginData
	body, err := io.ReadAll(r.Body)
	if err != nil {
		w.Write([]byte("{\"success\" : false}"))
		return
	}
	err = json.Unmarshal(body, &jsonRequest)
	if err != nil {
		w.Write([]byte("{\"success\" : false}"))
		println(err)
		return
	}
	var request pb.LoginRequest
	request.Email = jsonRequest.Email
	request.Password = jsonRequest.Password
	response, err := client.Login(context.Background(), &request)
	if err != nil {
		w.Write([]byte("{\"success\" : false}"))
		println(err)
		return
	}
	if !response.Success {
		w.Write([]byte("{\"success\" : false}"))
		return
	}
	answer, err := protojson.Marshal(response)
	if err != nil {
		w.Write([]byte("{\"success\" : false}"))
		return
	}
	cookie := http.Cookie{
		Name:     "session_id",
		Value:    response.SessionId,
		Path:     "/",
		MaxAge:   600,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	}
	http.SetCookie(w, &cookie)
	w.Write(answer)

}
func registerUser(w http.ResponseWriter, r *http.Request) {
	println("register request:", r.URL.Path)
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
		w.Write([]byte("{\"success\" : false}"))
		return
	}
	err = json.Unmarshal(body, &jsonRequest)
	if err != nil {
		w.Write([]byte("{\"success\" : false}"))
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
		w.Write([]byte("{\"success\" : false}"))
		println(err.Error())
		return
	}
	if !response.Success {
		w.Write([]byte("{\"success\" : false}"))
		return
	}
	answer, err := protojson.Marshal(response)
	if err != nil {
		w.Write([]byte("{\"success\" : false}"))
		return
	}
	cookie := http.Cookie{
		Name:     "session_id",
		Value:    response.SessionId,
		Path:     "/",
		MaxAge:   600,
		HttpOnly: true,
		Secure:   true,
		SameSite: http.SameSiteLaxMode,
	}
	http.SetCookie(w, &cookie)
	w.Write(answer)

}
func main() {
	http.HandleFunc("/api/registerUser", registerUser)
	http.HandleFunc("/api/login", loginUser)

	log.Fatal(http.ListenAndServe(":4010", nil))

}
