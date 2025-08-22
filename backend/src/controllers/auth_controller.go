package controllers

import (
	"encoding/json"
	"net/http"
	"backend/src/models"
	"backend/src/repository"
	"database/sql"
    
	"golang.org/x/crypto/bcrypt"
)


func RegisterUser(db *sql.DB, w http.ResponseWriter, r *http.Request) {
    var user models.User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, "Invalid input", http.StatusBadRequest)
        return
    }
     hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        http.Error(w, "Error securing password", http.StatusInternalServerError)
        return
    }
    user.Password = string(hashedPassword)

    if err := repository.CreateUser(db, &user); err != nil {
        http.Error(w, "Could not create user", http.StatusInternalServerError)
        return
    }


    user.Password = ""
    json.NewEncoder(w).Encode(user)
}
