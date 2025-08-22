package websocket

import (
	"fmt"
)

type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (pool *Pool) Start() {
	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			fmt.Println("Size of Connection Pool:", len(pool.Clients))

			for c := range pool.Clients {
				c.Conn.WriteJSON(Message{Type: 1, Body: "New User Joined...."})
			}

		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			fmt.Println("Size of Connection Pool:", len(pool.Clients))

			for c := range pool.Clients {
				c.Conn.WriteJSON(Message{Type: 1, Body: "User Disconnected"})
			}

		case message := <-pool.Broadcast:
			fmt.Println("Sending message to all clients")

			for c := range pool.Clients {
				if err := c.Conn.WriteJSON(message); err != nil {
					fmt.Println("Error broadcasting:", err)
					c.Conn.Close()
					delete(pool.Clients, c)
				}
			}
		}
	}
}
