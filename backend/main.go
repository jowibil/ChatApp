package main

import (
	"fmt"
	"log"
	"net/http"

	"backend/config"
	"backend/pkg/websocket"
	"backend/src/controllers"
	"database/sql"
)

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")

	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}

	client := &websocket.Client{
		ID:   "guest", 
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	go client.Read()
}

func setupRoutes(pool *websocket.Pool, db *sql.DB) {
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})

	http.HandleFunc("/api/register", func(w http.ResponseWriter, r *http.Request) {
		controllers.RegisterUser(db, w, r)
	})

	http.HandleFunc("/api/users", func(w http.ResponseWriter, r *http.Request) {
		controllers.GetUsers(db, w, r)
	})

	http.HandleFunc("/api/messages", func(w http.ResponseWriter, r *http.Request) {
		controllers.GetMessages(db, w, r)
	})
}

func main() {
	fmt.Println("Distributed Chat App starting...")

	db := config.ConnectDB()
	defer db.Close()

	pool := websocket.NewPool()
	go pool.Start()

	setupRoutes(pool, db)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
