package services

import (
	"JobFinder/backend/persistence"
	"errors"
)

type ApplicationService struct {
	applicationRepository persistence.ApplicationRepository
}

func NewApplicationService(applicationRepository persistence.ApplicationRepository) *ApplicationService {
	return &ApplicationService{
		applicationRepository: applicationRepository,
	}
}

func (s *ApplicationService) CreateApplication(jobID uint, userId uint) error {
	//// check if JobId and UserID are valid todo what the hell is this
	//_, err := s.applicationRepository.GetApplicationByID(jobID)
	//if err != nil {
	//	return err
	//}
	//_, err = s.applicationRepository.GetApplicationByID(userId)
	//if err != nil {
	//	return err
	//}

	// Save the application to the database
	err := s.applicationRepository.CreateApplication(
		&persistence.Application{
			JobID:  jobID,
			UserID: userId,
			Status: "pending",
		},
	)
	if err != nil {
		return err
	}
	return nil
}

func (s *ApplicationService) GetApplicationsByJobID(jobID uint) ([]*persistence.Application, error) {
	applications, err := s.applicationRepository.GetApplicationsByJobID(jobID)
	if err != nil {
		return nil, err
	}
	return applications, nil
}

func (s *ApplicationService) GetApplicationsByUserID(userID uint) ([]*persistence.Application, error) {
	applications, err := s.applicationRepository.GetApplicationsByUserID(userID)
	if err != nil {
		return nil, err
	}
	return applications, nil
}

func (s *ApplicationService) UpdateApplicationStatus(applicationID uint, status string) error {
	application, err := s.applicationRepository.GetApplicationByID(applicationID)
	if err != nil {
		return err
	}
	if application == nil {
		return errors.New("application not found")
	}
	application.Status = status
	err = s.applicationRepository.UpdateApplication(application)
	if err != nil {
		return err
	}
	return nil
}

func (s *ApplicationService) DeleteApplication(applicationID uint) error {
	application, err := s.applicationRepository.GetApplicationByID(applicationID)
	if err != nil {
		return err
	}
	if application == nil {
		return errors.New("application not found")
	}
	err = s.applicationRepository.DeleteApplication(application)
	if err != nil {
		return err
	}
	return nil
}

func (s *ApplicationService) GetApplicationByID(applicationID uint) (*persistence.Application, error) {
	application, err := s.applicationRepository.GetApplicationByID(applicationID)
	if err != nil {
		return nil, err
	}
	return application, nil
}
