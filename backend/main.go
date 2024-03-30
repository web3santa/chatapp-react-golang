package main

import (
	"fmt"
	"net/http"
	"santa/websocket-react/pkg/websockets"
)

func serveWs(pool *websockets.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("websocket endpoint reached")

	conn, err := websockets.Upgrade(w, r)

	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}

	client := &websockets.Client{
		Conn: conn,
		Pool: pool,
	}
	pool.Register <- client
	client.Read()

}

func setupRoutes() {
	pool := websockets.NewPool()
	go pool.Start()

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})

}

func main() {
	fmt.Println("full stack cha project")
	setupRoutes()
	http.ListenAndServe(":9000", nil)
}
