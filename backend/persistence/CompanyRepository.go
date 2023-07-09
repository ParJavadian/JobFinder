package persistence

import (
	"gorm.io/gorm"
)

type Company struct {
	gorm.Model
	Name      string
	Email     string `gorm:"uniqueIndex"`
	Password  string
	Field     string
	Founded   string
	Employees int
	Location  string
	Details   string
}

type CompanyRepository struct {
	db *gorm.DB
}

func NewCompanyRepository(db *gorm.DB) *CompanyRepository {
	return &CompanyRepository{
		db: db,
	}
}

func (r *CompanyRepository) GetCompanyByID(companyID uint) (*Company, error) {
	var company Company
	result := r.db.First(&company, companyID)
	if result.Error != nil {
		return nil, result.Error
	}
	return &company, nil
}

func (r *CompanyRepository) GetCompanyByEmail(email string) (*Company, error) {
	var company Company
	result := r.db.Where("email = ?", email).First(&company)
	if result.Error != nil {
		return nil, result.Error
	}
	return &company, nil
}

func (r *CompanyRepository) CreateCompany(company *Company) error {
	result := r.db.Create(company)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *CompanyRepository) UpdateCompany(company *Company) error {
	result := r.db.Save(company)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *CompanyRepository) DeleteCompany(company *Company) error {
	result := r.db.Delete(company)
	if result.Error != nil {
		return result.Error
	}
	return nil
}
