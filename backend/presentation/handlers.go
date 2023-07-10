package presentation

import (
	"JobFinder/backend/persistence"
	"JobFinder/backend/services"
	"github.com/gin-gonic/gin"
	"strconv"
)

type Handler struct {
	userService        *services.UserService
	companyService     *services.CompanyService
	jobService         *services.JobService
	applicationService *services.ApplicationService
}

func NewHandler(
	userService *services.UserService,
	companyService *services.CompanyService,
	jobService *services.JobService,
	applicationService *services.ApplicationService,
) *Handler {
	return &Handler{
		userService:        userService,
		companyService:     companyService,
		jobService:         jobService,
		applicationService: applicationService,
	}
}

func (h *Handler) RegisterRoutes(router *gin.Engine) {
	router.POST("/login", h.Login)

	// user service apis
	router.POST("/register/user", h.RegisterUser)
	router.POST("/change-password", h.ChangePassword)
	router.POST("/edit-profile/user", h.EditUserProfile)

	// company service apis
	router.POST("/register/company", h.RegisterCompany)

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

func (h *Handler) EditUserProfile(context *gin.Context) {
	request := context.Request
	role, _ := context.Get("role")
	if role != "user" {
		context.JSON(401, gin.H{"error": "you are not allowed to do this action"})
		return
	}
	id, _ := context.Get("id")
	userId, _ := getUintFromString(id.(string))
	err := h.userService.EditProfile(
		userId,
		request.FormValue("firstname"),
		request.FormValue("lastname"),
		request.FormValue("profession"),
		request.FormValue("degree"),
		request.FormValue("location"),
		request.FormValue("languages"),
		request.FormValue("details"),
	)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	context.JSON(200, gin.H{"message": "profile updated successfully"})
}

func (h *Handler) Login(context *gin.Context) {
	// check if it can be a user
	err := h.LoginUser(context)
	if err != nil {
		err = h.LoginCompany(context)
		if err != nil {
			context.JSON(400, gin.H{"error": err.Error()})
			return
		}
	}
}

func (h *Handler) LoginUser(context *gin.Context) error {
	request := context.Request
	password := request.FormValue("password")
	email := request.FormValue("email")
	token, err := h.userService.Login(email, password)
	if err != nil {
		return err
	}
	context.JSON(200, gin.H{"token": token, "role": "user"})
	return nil
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

func (h *Handler) LoginCompany(context *gin.Context) error {
	request := context.Request
	password := request.FormValue("password")
	email := request.FormValue("email")
	token, err := h.companyService.Login(email, password)
	if err != nil {
		return err
	}
	context.JSON(200, gin.H{"token": token, "role": "company"})
	return nil
}

func (h *Handler) CreateApplication(context *gin.Context) {
	request := context.Request
	role, _ := context.Get("role")
	if role != "user" {
		context.JSON(401, gin.H{"error": "you are not allowed to do this action"})
		return
	}
	userId, _ := context.Get("id")
	jobId := request.FormValue("job-id")
	uintJobId, err := getUintFromString(jobId)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err = h.applicationService.CreateApplication(uintJobId, userId.(uint))
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	context.JSON(200, gin.H{"message": "application created successfully"})
}

func (h *Handler) GetUserApplications(context *gin.Context) {
	role, _ := context.Get("role")
	if role != "user" {
		context.JSON(401, gin.H{"error": "you are not allowed to do this action"})
		return
	}
	userId, _ := context.Get("id")
	applications, err := h.applicationService.GetApplicationsByUserID(userId.(uint))
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	jsonResponse := getJsonResponseFromApplications(applications)
	context.JSON(200, jsonResponse)
}

func (h *Handler) GetJobApplications(context *gin.Context) {
	request := context.Request
	// read jobId from request url param
	jobId := request.URL.Query().Get("job-id")
	uintJobId, err := getUintFromString(jobId)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	applications, err := h.applicationService.GetApplicationsByJobID(uintJobId)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	jsonResponse := getJsonResponseFromApplications(applications)
	context.JSON(200, jsonResponse)

}

func (h *Handler) UpdateApplicationStatus(context *gin.Context) {
	request := context.Request
	role, _ := context.Get("role")
	if role != "company" {
		context.JSON(401, gin.H{"error": "you are not allowed to do this action"})
		return
	}
	applicationId, err := getUintFromString(request.FormValue("application-id"))
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
	}

	status := request.FormValue("status")
	if status != "accepted" && status != "rejected" && status != "pending" {
		context.JSON(400, gin.H{"error": "invalid status"})
		return
	}

	err = h.applicationService.UpdateApplicationStatus(applicationId, status)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	context.JSON(200, gin.H{"message": "application status updated successfully"})

}

func (h *Handler) DeleteApplication(context *gin.Context) {
	request := context.Request
	role, _ := context.Get("role")
	if role != "user" {
		context.JSON(401, gin.H{"error": "you are not allowed to do this action"})
		return
	}
	applicationId, err := getUintFromString(request.FormValue("application-id"))
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	err = h.applicationService.DeleteApplication(applicationId)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	context.JSON(200, gin.H{"message": "application deleted successfully"})
}

func (h *Handler) GetApplicationByID(context *gin.Context) {
	request := context.Request
	applicationId, err := getUintFromString(request.URL.Query().Get("application-id"))
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	application, err := h.applicationService.GetApplicationByID(applicationId)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	jsonResponse := gin.H{
		"id":         application.ID,
		"job-id":     application.JobID,
		"user-id":    application.UserID,
		"status":     application.Status,
		"created-at": application.CreatedAt,
	}
	context.JSON(200, jsonResponse)
}

func (h *Handler) CreateJob(context *gin.Context) {
	request := context.Request
    	role, _ := context.Get("role")
    	if role != "company" {
    		context.JSON(401, gin.H{"error": "you are not allowed to do this action"})
    		return
    	}
    	companyId, _ := context.Get("id")
    	jobId := request.FormValue("job-id")
    	uintJobId, err := getUintFromString(jobId)
    	if err != nil {
    		context.JSON(400, gin.H{"error": err.Error()})
    		return
    	}

    	err = h.jobService.CreateJob(uintJobId, companyId.(uint))
    	if err != nil {
    		context.JSON(400, gin.H{"error": err.Error()})
    		return
    	}
    	context.JSON(200, gin.H{"message": "job created successfully"})
}

func getJsonResponseFromApplications(applications []*persistence.Application) []gin.H {
	jsonResponse := make([]gin.H, len(applications))
	for i, application := range applications {
		jsonResponse[i] = gin.H{
			"id":         application.ID,
			"job-id":     application.JobID,
			"user-id":    application.UserID,
			"status":     application.Status,
			"created-at": application.CreatedAt,
		}
	}
	return jsonResponse
}

func getUintFromString(str string) (uint, error) {
	uintStr, err := strconv.Atoi(str)
	if err != nil {
		return 0, err
	}
	return uint(uintStr), nil
}
