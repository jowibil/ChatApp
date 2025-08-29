package main

import (
	"log"
	"net/http"

	"backend/config"
	"backend/pkg/websocket"
	"backend/src/controllers"
	"database/sql"
	"backend/middleware"
)

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")
	if username == "" {
		username = "guest"
	}

	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		log.Println("Upgrade error:", err)
		return
	}

	client := &websocket.Client{
		Username: username,
		Conn:     conn,
		Pool:     pool,
	}

	pool.Register <- client
	go client.Read()
}

func setupRoutes(pool *websocket.Pool, db *sql.DB) {
	mux := http.NewServeMux()

	mux.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(pool, w, r)
	})

	mux.HandleFunc("/api/register", func(w http.ResponseWriter, r *http.Request) {
		controllers.RegisterUser(db, w, r)
	})

	mux.HandleFunc("/api/users", func(w http.ResponseWriter, r *http.Request) {
		controllers.GetUsers(db, w, r)
	})

	mux.HandleFunc("/api/messages", func(w http.ResponseWriter, r *http.Request) {
		controllers.GetMessages(db, w, r)
	})

	mux.HandleFunc("/api/login", func(w http.ResponseWriter, r *http.Request) {
		controllers.Login(db, w, r)
	})

	handler := middleware.CorsMiddleware(mux)
	http.ListenAndServe(":8080", handler)
}

func main() {
	db := config.ConnectDB()
	defer db.Close()

	pool := websocket.NewPool()
	go pool.Start()

	setupRoutes(pool, db)
}
