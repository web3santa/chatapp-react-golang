package main

import (
	"fmt"
	"net/http"
	"santa/websocket-react/pkg/websockets"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func serveWs(pool *websockets.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("websocket endpoint reached")

	conn, err := upgrader.Upgrade(w, r, nil)

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
