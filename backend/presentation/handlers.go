package presentation

import (
	"JobFinder/backend/persistence"
	"JobFinder/backend/services"
	"github.com/gin-gonic/gin"
	"strconv"
)

type Handler struct {
	userService    *services.UserService
	companyService *services.CompanyService
}

func NewHandler(userService *services.UserService, companyService *services.CompanyService) *Handler {
	return &Handler{
		userService:    userService,
		companyService: companyService,
	}
}

func (h *Handler) RegisterRoutes(router *gin.Engine) {
	// user service apis
	router.POST("/register/user", h.RegisterUser)
	router.POST("/login/user", h.LoginUser)
	router.POST("/change-password", h.ChangePassword)

	// company service apis
	router.POST("/register/company", h.RegisterCompany)
	router.POST("/login/company", h.LoginCompany)

	// application apis
	router.POST("/application", h.CreateApplication)
	router.DELETE("/application", h.DeleteApplication)
	router.GET("/application", h.GetApplicationByID)
	router.GET("/applications/user", h.GetUserApplications)
	router.GET("/applications/job", h.GetJobApplications)
	router.POST("/application/status", h.UpdateApplicationStatus)

	// job service apis
	router.POST("/job", h.CreateJob)
	// todo we should complete them
}

func (h *Handler) RegisterUser(context *gin.Context) {
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

func (h *Handler) LoginUser(context *gin.Context) {
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
	request := context.Request
	currentPassword := request.FormValue("current-password")
	newPassword := request.FormValue("new-password")
	email := request.FormValue("email")
	err := h.userService.ChangePassword(email, currentPassword, newPassword)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	context.JSON(200, gin.H{"message": "password changed successfully"})
}

func (h *Handler) RegisterCompany(context *gin.Context) {
	request := context.Request
	employees, err := strconv.Atoi(request.FormValue("employees"))
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}

	company := persistence.Company{
		Name:      request.FormValue("name"),
		Email:     request.FormValue("email"),
		Password:  request.FormValue("password"),
		Field:     request.FormValue("field"),
		Founded:   request.FormValue("founded"),
		Employees: employees,
		Location:  request.FormValue("location"),
		Details:   request.FormValue("details"),
	}
	err = h.companyService.RegisterCompany(&company)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	context.JSON(200, gin.H{"message": "company account created successfully"})
}

func (h *Handler) LoginCompany(context *gin.Context) {
	request := context.Request
	password := request.FormValue("password")
	email := request.FormValue("email")
	token, err := h.companyService.Login(email, password)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	context.JSON(200, gin.H{"token": token})
}

func (h *Handler) CreateApplication(context *gin.Context) {
	// todo
}

func (h *Handler) GetUserApplications(context *gin.Context) {
	// todo
}

func (h *Handler) GetJobApplications(context *gin.Context) {
	// todo
}

func (h *Handler) UpdateApplicationStatus(context *gin.Context) {
	// todo
}

func (h *Handler) DeleteApplication(context *gin.Context) {
	// todo
}

func (h *Handler) GetApplicationByID(context *gin.Context) {
	// todo
}

func (h *Handler) CreateJob(context *gin.Context) {
	// todo
}
