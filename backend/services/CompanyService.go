package services

import (
	"JobFinder/backend/persistence"
	"errors"
	"time"
)

type CompanyService struct {
	companyRepository persistence.CompanyRepository
}

func NewCompanyService(companyRepository persistence.CompanyRepository) *CompanyService {
	return &CompanyService{
		companyRepository: companyRepository,
	}
}

func (s *CompanyService) GetCompanyByID(companyID uint) (*persistence.Company, error) {
	company, err := s.companyRepository.GetCompanyByID(companyID)
	if err != nil {
		return nil, err
	}
	return company, nil
}

func (s *CompanyService) GetCompanyByEmail(email string) (*persistence.Company, error) {
	company, err := s.companyRepository.GetCompanyByEmail(email)
	if err != nil {
		return nil, err
	}
	return company, nil
}

func (s *CompanyService) RegisterCompany(company *persistence.Company) error {
	// Check if the email is already registered
	existingCompany, _ := s.companyRepository.GetCompanyByEmail(company.Email)
	if existingCompany != nil {
		return errors.New("email is already registered")
	}

	// Hash the company's password
	hashedPassword, err := hashPassword(company.Password)
	if err != nil {
		return err
	}

	// Set the hashed password and other necessary fields
	company.Password = hashedPassword
	company.CreatedAt = time.Now()

	// Save the company to the database
	err = s.companyRepository.CreateCompany(company)
	if err != nil {
		return err
	}

	return nil
}

func (s *CompanyService) Login(email, password string) (string, error) {
	// Get the company by email
	company, err := s.companyRepository.GetCompanyByEmail(email)
	if err != nil {
		return "", err
	}

	// Verify the company's password
	passwordMatch := checkPasswordHash(password, company.Password)
	if !passwordMatch {
		return "", errors.New("incorrect password")
	}

	return GenerateJWTToken(company.ID, "company")
}
