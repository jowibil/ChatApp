package repository

import (
	"context"
	"database/sql"
	"fmt"
	"backend/src/models"
	"time"
)

func SaveMessage(db *sql.DB, msg models.Message) error {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	_, err := db.ExecContext(
		ctx,
		"INSERT INTO messages (username, content, created_at) VALUES ($1, $2, $3)",
		msg.Username, msg.Content, msg.CreatedAt,
	)
	if err != nil {
		return fmt.Errorf("SaveMessage failed: %w", err)
	}
	return nil
}

func GetMessages(db *sql.DB, limit int) ([]models.Message, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	rows, err := db.QueryContext(
		ctx,
		"SELECT id, username, content, created_at FROM messages ORDER BY created_at DESC LIMIT $1",
		limit,
	)
	if err != nil {
		return nil, fmt.Errorf("GetMessages failed: %w", err)
	}
	defer rows.Close()

	var messages []models.Message
	for rows.Next() {
		var msg models.Message
		if err := rows.Scan(&msg.ID, &msg.Username, &msg.Content, &msg.CreatedAt); err != nil {
			return nil, fmt.Errorf("row scan failed: %w", err)
		}
		messages = append(messages, msg)
	}
	return messages, nil
}
