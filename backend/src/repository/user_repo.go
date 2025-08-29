package repository

import (
	"backend/src/models"
	"database/sql"
	"fmt"

	"golang.org/x/crypto/bcrypt"
	"time"
)

func CreateUser(db *sql.DB, user *models.User) error {
    query := `INSERT INTO users (username, password, created_at) VALUES ($1, $2, $3) RETURNING id`

    err := db.QueryRow(query, user.Username, user.Password, time.Now()).Scan(&user.ID)

    if err != nil {
        return fmt.Errorf("CreateUser failed: %w", err)
    }
    
    return nil
}


func LoginUser(db *sql.DB, username, password string)(*models.User, error) {
	var user models.User
	query := "SELECT id, username, password FROM users WHERE username = $1"
	
	err := db.QueryRow(query, username).Scan(&user.ID, &user.Username, &user.Password)

	if err == sql.ErrNoRows {
		return nil, fmt.Errorf("invalid credentials")
	} else if err != nil{
	  return nil, fmt.Errorf("db query error: %w", err)
	}	

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil{
		return nil, fmt.Errorf("invalid credentials")
	}
	

	return &user, nil
}


func GetAllUsers(db *sql.DB) ([]models.User, error) {
	rows, err := db.Query("SELECT id, username, created_at FROM users")
	if err != nil {
		return nil, fmt.Errorf("GetAllUsers failed: %w", err)
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var u models.User
		if err := rows.Scan(&u.ID, &u.Username, &u.CreatedAt); err != nil {
			return nil, err
		}
		users = append(users, u)
	}
	return users, nil
}
