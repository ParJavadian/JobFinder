package services

import (
	"JobFinder/backend/persistence"
	"errors"
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
	// Check if the ID is already registered
	existingJob, _ := s.jobRepository.GetJobByID(job.ID)
	if existingJob != nil {
		return errors.New("there is already a job with this ID")
	}

	// Save the job to the database
	err := s.jobRepository.CreateJob(job)
	if err != nil {
		return err
	}
	return nil
}
