package main

import (
	"context"
	"log"
	"net/http"
	"net/http/httputil"
	pb "wehelp_goservice/grpc"

	"github.com/golang/protobuf/jsonpb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/protobuf/encoding/protojson"
)

type LoginData struct {
	Login, Password string
}

func registerUser(w http.ResponseWriter, r *http.Request) {
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
	var request pb.RegisterRequest
	jsonpb.Unmarshal(r.Body, &request)
	response, err := client.Register(context.Background(), &request)
	if err != nil {
		w.Write([]byte("{\"succes\" : false}"))
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
	http.HandleFunc("/registerUser", registerUser)
	log.Fatal(http.ListenAndServe(":3035", nil))

}
