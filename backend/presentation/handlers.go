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
	router.POST("/edit-profile/company", h.EditCompanyProfile)
	router.GET("/company", h.GetCompanyByID)

	// application apis
	router.POST("/application", h.CreateApplication)
	router.DELETE("/application", h.DeleteApplication)
	router.GET("/application", h.GetApplicationByID)
	router.GET("/get-company-info", h.GetCompanyInfo)
	router.GET("/get-user-info", h.GetUserInfo)
	router.GET("/applications/user", h.GetUserApplications)
	router.GET("/applications/job", h.GetJobApplications)
	router.POST("/application/status", h.UpdateApplicationStatus)

	// job service apis
	router.POST("/job", h.CreateJob)
	router.GET("/jobs", h.GetJobs)
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

	if h.companyService.ExistsByEmail(user.Email) {
		context.JSON(400, gin.H{"error": "email already exists"})
		return
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
	err := h.userService.EditProfile(
		id.(uint),
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

	if h.userService.ExistsByEmail(company.Email) {
		context.JSON(400, gin.H{"error": "email already exists"})
		return
	}

	err = h.companyService.RegisterCompany(&company)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	context.JSON(200, gin.H{"message": "company account created successfully"})
}

func (h *Handler) EditCompanyProfile(context *gin.Context) {
	request := context.Request
	role, _ := context.Get("role")
	if role != "company" {
		context.JSON(401, gin.H{"error": "you are not allowed to do this action"})
		return
	}
	id, _ := context.Get("id")
	//companyId, _ := getUintFromString(id.(string))
	employees, err := strconv.Atoi(request.FormValue("employees"))
	if err != nil {
		employees = -1
	}
	err = h.companyService.EditProfile(
		id.(uint),
		request.FormValue("name"),
		request.FormValue("field"),
		request.FormValue("founded"),
		request.FormValue("location"),
		employees,
		request.FormValue("details"),
	)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	context.JSON(200, gin.H{"message": "profile updated successfully"})
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

func (h *Handler) GetCompanyByID(context *gin.Context) {
	companyId, exists := context.GetQuery("company-id")
	if !exists || companyId == "" {
		context.JSON(400, gin.H{"error": "company id is required"})
		return
	}
	uintCompanyId, err := getUintFromString(companyId)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	company, err := h.companyService.GetCompanyByID(uintCompanyId)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if company == nil {
		context.JSON(400, gin.H{"error": "company not found"})
		return
	}
	jsonResponse := gin.H{
		"id":        company.ID,
		"name":      company.Name,
		"email":     company.Email,
		"location":  company.Location,
		"field":     company.Field,
		"founded":   company.Founded,
		"employees": company.Employees,
		"details":   company.Details,
	}
	context.JSON(200, jsonResponse)
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
	jobId, exists := context.GetQuery("job-id")
	if !exists || jobId == "" {
		context.JSON(400, gin.H{"error": "job-id is required"})
		return
	}
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
	applicationId, exists := context.GetQuery("application-id")
	if !exists || applicationId == "" {
		context.JSON(400, gin.H{"error": "application-id is required"})
		return
	}
	applicationIdUint, err := getUintFromString(applicationId)
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	application, err := h.applicationService.GetApplicationByID(applicationIdUint)
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
	salary, _ := strconv.Atoi(request.FormValue("salary"))
	job := &persistence.Job{
		CompanyID:    companyId.(uint),
		Title:        request.FormValue("title"),
		Field:        request.FormValue("field"),
		Time:         request.FormValue("time"),
		RemoteStatus: request.FormValue("remote-status"),
		Salary:       int64(salary),
		Details:      request.FormValue("details"),
	}
	err := h.jobService.CreateJob(job)
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

func getJsonResponseFromJobs(jobs []*persistence.Job) []gin.H {
	jsonResponse := make([]gin.H, len(jobs))
	for i, job := range jobs {
		jsonResponse[i] = gin.H{
			"id":           job.ID,
			"title":        job.Title,
			"field":        job.Field,
			"time":         job.Time,
			"remoteStatus": job.RemoteStatus,
			"salary":       job.Salary,
			"details":      job.Details,
			"created-at":   job.CreatedAt,
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

func (h *Handler) GetJobs(context *gin.Context) {
	jobs, err := h.jobService.GetJobs()
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	jsonResponse := getJsonResponseFromJobs(jobs)
	context.JSON(200, jsonResponse)
}

func (h *Handler) GetCompanyInfo(context *gin.Context) {
	companyId, _ := context.Get("id")
	if companyId == "" {
		context.JSON(400, gin.H{"error": "company id is required"})
		return
	}
	company, err := h.companyService.GetCompanyByID(companyId.(uint))
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if company == nil {
		context.JSON(400, gin.H{"error": "company not found"})
		return
	}
	jsonResponse := gin.H{
		"id":        company.ID,
		"name":      company.Name,
		"email":     company.Email,
		"location":  company.Location,
		"field":     company.Field,
		"founded":   company.Founded,
		"employees": company.Employees,
		"details":   company.Details,
	}
	context.JSON(200, jsonResponse)
}


func (h *Handler) GetUserInfo(context *gin.Context) {
	userId, _ := context.Get("id")
	if userId == "" {
		context.JSON(400, gin.H{"error": "user id is required"})
		return
	}
	user, err := h.userService.GetUserByID(companyId.(uint))
	if err != nil {
		context.JSON(400, gin.H{"error": err.Error()})
		return
	}
	if user == nil {
		context.JSON(400, gin.H{"error": "user not found"})
		return
	}
	jsonResponse := gin.H{
		"id":        user.ID,
		"email":      user.Email,
		"firstname":     user.Firstname,
		"lastname":  user.Lastname,
		"profession":     user.Profession,
		"degree":   user.Degree,
		"location": user.Location,
		"languages":   user.Language,
		"details":   user.Details,
	}
	context.JSON(200, jsonResponse)
}
