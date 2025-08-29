package websocket

import (
	"encoding/json"
	"log"
	"backend/src/models"
	"github.com/gorilla/websocket"
	"time"
)

type Client struct {
	ID       string
	Username string
	Conn     *websocket.Conn
	Pool     *Pool
}

func (c *Client) Read() {
	defer func() {
		c.Pool.Unregister <- c
		c.Conn.Close()
	}()

	for {
		_, p, err := c.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}

		var msg struct {
			Type     string `json:"type"`
			Username string `json:"username"`
			Content  string `json:"content"`
		}
		if err := json.Unmarshal(p, &msg); err != nil {
			log.Println("Error parsing message:", err)
			continue
		}

		switch msg.Type {
		case "message":
			c.Pool.Broadcast <- models.Message{
				Username:  msg.Username,
				Content:   msg.Content,
				CreatedAt: time.Now(),
			}
		case "join":
			c.Pool.Broadcast <- models.Message{
				Username:  "System",
				Content:   msg.Username + " joined the chat",
				CreatedAt: time.Now(),
			}
		}
	}
}

