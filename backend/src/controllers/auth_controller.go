package controllers

import (
	"backend/src/models"
	"backend/src/repository"
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"golang.org/x/crypto/bcrypt"
)


func RegisterUser(db *sql.DB, w http.ResponseWriter, r *http.Request) {
    var user models.User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, "Invalid input", http.StatusBadRequest)
        return
    }

    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil{
        http.Error(w, "Failed to hash", http.StatusInternalServerError)
        return
    }

    user.Password = string(hashedPassword)

    if err := repository.CreateUser(db, &user); err != nil {
        http.Error(w, "User already exists", http.StatusInternalServerError)
        return
    }


    fmt.Printf("\nUser Registration Success\n")
    user.Password = ""
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}

func Login(db *sql.DB, w http.ResponseWriter, r *http.Request) {
    body, err := io.ReadAll(r.Body)
    if err != nil {
        http.Error(w, "Cannot read body", http.StatusBadRequest)
        return
    }
    
    var input struct {
        Username string `json:"username"`
        Password string `json:"password"`
    }

    if err := json.Unmarshal(body, &input); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }
    
    user, err := repository.LoginUser(db, input.Username, input.Password)
    if err != nil {
        http.Error(w, "Login failed", http.StatusUnauthorized)
        return
    }

    fmt.Printf("\nUser Login Success\n")
    user.Password = ""
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}