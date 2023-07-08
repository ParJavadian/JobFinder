package presentation

// initialize database, router, and server

import (
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

func main() {
	// todo initialize database

	// initialize router
	router := initRouter()

	// initialize server
	log.Println("Starting server on port 8080...")
	err := http.ListenAndServe(":8080", router)
	if err != nil {
		log.Fatal(err)
	}
}

func initRouter() *gin.Engine {
	router := gin.Default()

	router.POST("/login", loginHandler)
	router.GET("/jobs", getJobsHandler)

	// Authenticated routes
	authRoutes := router.Group("/api")
	authRoutes.Use(authMiddleware)
	{
		authRoutes.POST("/jobs", createJobHandler)
		authRoutes.GET("/applications", getApplicationsHandler)
	}

	return router
}
