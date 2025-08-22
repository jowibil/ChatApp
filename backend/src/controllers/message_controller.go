package controllers

import (
	"encoding/json"
	"net/http"
	"backend/src/repository"
	"database/sql"
)

func GetMessages(db *sql.DB, w http.ResponseWriter, r *http.Request) {
    messages, err := repository.GetMessages(db, 20)
    if err != nil {
        http.Error(w, "Error fetching messages", http.StatusInternalServerError)
        return
    }
    json.NewEncoder(w).Encode(messages)
}

