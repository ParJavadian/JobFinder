package services

import (
	"JobFinder/backend/persistence"
)

type JobService struct {
	jobRepository persistence.JobRepository
}

func NewJobService(jobRepository persistence.JobRepository) *JobService {
	return &JobService{
		jobRepository: jobRepository,
	}
}

func (s *JobService) CreateJob(job *persistence.Job) error {
	// Save the job to the database
	err := s.jobRepository.CreateJob(job)
	if err != nil {
		return err
	}
	return nil
}

func (s *JobService) GetJobsByCompany(companyID uint) ([]*persistence.Job, error) {
	jobs, err := s.jobRepository.GetJobsByCompanyID(companyID)
	if err != nil {
		return nil, err
	}
	return jobs, nil
}

func (s *JobService) GetJobs() ([]*persistence.Job, error) {
	jobs, err := s.jobRepository.SearchJobs()
	if err != nil {
		return nil, err
	}
	return jobs, nil
}
