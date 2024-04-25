package main

import (
	"log"
	"net/http"
	"net/http/httputil"
)

type LoginData struct {
	Login, Password string
}

func http_function(w http.ResponseWriter, r *http.Request) {
	res, err := httputil.DumpRequest(r, true)

	if err == nil {
		println(string(res))
	}
	if r.Method == "GET" {
		return
	} else if r.Method == "POST" {
		return
	}
}
func main() {
	http.HandleFunc("/login", http_function)
	log.Fatal(http.ListenAndServe(":3035", nil))

}
