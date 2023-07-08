package persistence

import (
	"container/list"
	"errors"
	"gorm.io/gorm"
	"time"
)

// User represents a user account
type User struct {
	gorm.Model
	Firstname  string
	Lastname   string
	Email      string
	Profession string
	Degree     string
	Location   string
	Languages  list.List
	CVText     string
	Password   string
	CreatedAt  time.Time
}

// UserRepository handles user-related data operations
type UserRepository struct {
	db *gorm.DB
}

// NewUserRepository creates a new instance of UserRepository
func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

// CreateUser creates a new user account
func (r *UserRepository) CreateUser(user *User) error {
	result := r.db.Create(user)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// GetUserByID retrieves a user by ID
func (r *UserRepository) GetUserByID(userID uint) (*User, error) {
	var user User
	result := r.db.First(&user, userID)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, result.Error
	}
	return &user, nil
}

// GetUserByEmail retrieves a user by email
func (r *UserRepository) GetUserByEmail(email string) (*User, error) {
	var user User
	result := r.db.Where("email = ?", email).First(&user)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			return nil, nil
		}
		return nil, result.Error
	}
	return &user, nil
}

// DeleteUser deletes a user account
func (r *UserRepository) DeleteUser(userID uint) error {
	result := r.db.Delete(&User{}, userID)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

// UpdateUserPassword updates the password for a user account
func (r *UserRepository) UpdateUserPassword(userID uint, hashedPassword string) error {
	result := r.db.Model(&User{}).Where("id = ?", userID).Update("password", hashedPassword)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
