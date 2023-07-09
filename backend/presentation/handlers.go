package presentation

import (
	"JobFinder/backend/persistence"
	"JobFinder/backend/services"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	userService *services.UserService
}

func NewHandler(userService *services.UserService) *Handler {
	return &Handler{
		userService: userService,
	}
}

func (h *Handler) RegisterRoutes(router *gin.Engine) {
	router.POST("/register", h.RegisterAccount)
	router.POST("/login", h.Login)
	router.POST("/change-password", h.ChangePassword)
}

func (h *Handler) RegisterAccount(context *gin.Context) {
	request := context.Request
	user := persistence.User{
		Email:      request.FormValue("email"),
		Password:   request.FormValue("password"),
		Firstname:  request.FormValue("firstname"),
		Lastname:   request.FormValue("lastname"),
		Profession: request.FormValue("profession"),
		Location:   request.FormValue("location"),
		Language:   request.FormValue("languages"),
		Details:    request.FormValue("details"),
	}
	err := h.userService.RegisterAccount(&user)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	context.JSON(200, gin.H{"message": "account created successfully"})
}

func (h *Handler) Login(context *gin.Context) {
	request := context.Request
	password := request.FormValue("password")
	email := request.FormValue("email")
	token, err := h.userService.Login(email, password)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	context.JSON(200, gin.H{"token": token})
}

func (h *Handler) ChangePassword(context *gin.Context) {
	// todo
}
