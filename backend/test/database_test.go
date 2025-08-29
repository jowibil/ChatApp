package test

import (
    "fmt"
	"testing"
    "golang.org/x/crypto/bcrypt"
)

func TestPasswordHashMatch(t *testing.T) {
    // Test 1: Direct bcrypt test
    fmt.Println("=== Direct Bcrypt Test ===")
    password := "password123"
    
    // Generate hash
    hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
    if err != nil {
        fmt.Printf("Error generating hash: %v\n", err)
        return
    }
    
    fmt.Printf("Password: %s\n", password)
    fmt.Printf("Hash: %s\n", string(hash))
    
    // Compare immediately
    err = bcrypt.CompareHashAndPassword(hash, []byte(password))
    if err != nil {
        fmt.Printf("FAILED: %v\n", err)
    } else {
        fmt.Printf("SUCCESS: Password matches hash\n")
    }
    
    // Test 2: Use the exact hash from your database
    fmt.Println("\n=== Database Hash Test ===")
    dbHash := "$2a$10$5n5r3ylGhrCXNHEmRJPMK.eXoKm8X103.fXVMNK1ObNEMGxGhuDdC"
    testPasswords := []string{
        "password123",
        "Password123", 
        "password123 ", // with trailing space
        " password123", // with leading space
        "password123\n", // with newline
        "password123\r", // with carriage return
        "password123\r\n", // with CRLF
    }
    
    for _, testPwd := range testPasswords {
        err = bcrypt.CompareHashAndPassword([]byte(dbHash), []byte(testPwd))
        if err != nil {
            fmt.Printf("FAILED - '%s' (len:%d): %v\n", testPwd, len(testPwd), err)
        } else {
            fmt.Printf("SUCCESS - '%s' (len:%d): Password matches!\n", testPwd, len(testPwd))
        }
    }
    
    // Test 3: Byte-by-byte analysis
    fmt.Println("\n=== Byte Analysis ===")
    fmt.Printf("'password123' bytes: %v\n", []byte("password123"))
    fmt.Printf("'password123' hex: %x\n", []byte("password123"))
}