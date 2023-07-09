package presentation

import (
	"JobFinder/backend/services"
	"github.com/gin-gonic/gin"
)

func AuthMiddleware(c *gin.Context) {
	// check if token should be provided based on the route
	// todo other paths should be added here if needed
	if c.FullPath() == "/register" || c.FullPath() == "/login" {
		c.Next()
		return
	}
	token := c.Request.Header.Get("Authorization")
	if token == "" {
		c.JSON(401, gin.H{"error": "token not provided"})
		c.Abort()
		return
	}
	// verify token
	id, role, err := services.VerifyJWTToken(token)
	if err != nil {
		c.JSON(401, gin.H{"error": err.Error()})
		c.Abort()
		return
	}
	c.Set("id", id)
	c.Set("role", role)
	c.Next()
}
