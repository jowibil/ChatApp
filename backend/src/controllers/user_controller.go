package controllers

import (
	"encoding/json"
	"net/http"
	"backend/src/repository"
	"database/sql"
)

func GetUsers(db *sql.DB, w http.ResponseWriter, r *http.Request) {
    users, err := repository.GetAllUsers(db)
    if err != nil {
        http.Error(w, "Error fetching users", http.StatusInternalServerError)
        return
    }
    json.NewEncoder(w).Encode(users)
}

