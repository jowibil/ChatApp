package models

import "time"

type User struct {
	ID        int       `json:"id"`
	Username  string    `json:"username"`
	Password  string    `json:"-"` // hide password from JSON responses
	CreatedAt time.Time `json:"created_at"`
}
