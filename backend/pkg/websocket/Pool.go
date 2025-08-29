package websocket

import (
	"log"
	"backend/src/models"
)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan models.Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan models.Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			log.Printf("\n%s joined. Total clients: %d\n", client.Username, len(pool.Clients))

			for c := range pool.Clients {
				if c != client {
					c.Conn.WriteJSON(models.Message{
						Username: "System",
						Content:  client.Username + " joined the chat",
					})
				}
			}

		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			for c := range pool.Clients {
				c.Conn.WriteJSON(models.Message{
					Username: "System",
					Content:  client.Username + " left the chat",
				})
			}

		case message := <-pool.Broadcast:
			for c := range pool.Clients {
				c.Conn.WriteJSON(message)
			}
		}
	}
}
