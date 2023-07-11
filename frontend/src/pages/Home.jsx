import MyNavbar from "../components/MyNavBar";
import SearchInput from "../components/SearchInput";
import PrimaryJobCard from "../components/PrimaryJobCard";
import Container from "../components/Container";
import HorizContainer from "../components/HorizContainer";
import { Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

const SampleImgUrl =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcMGuOzi8xiMxTHT0Oj1UQygOfwvkENepvfov3kZ45RQ&s";
export default function Home() {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    let response = await fetch("http://localhost:8080/jobs", {
      headers: { Authorization: localStorage.token },
    });
    let primaryJobs = await response.json();
    const newJobs = await Promise.all(
      primaryJobs.map(async (job) => {
        let params = {
          "company-id": job.company_id,
        };

        let query = Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&");

        let url = "http://localhost:8080/company?" + query;
        let response2 = await fetch(url, {
          headers: { Authorization: localStorage.token },
        });
        let company = await response2.json();
        const newJob = {
          Title: job.title,
          Field: job.field,
          Salary: job.salary,
          Location: company.location,
          Company: company.name,
          Logosrc:
            "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
          Time: job.time,
          Remote: job.remoteStatus,
          Detail: job.details,
          CompField: company.field,
          CompFounded: company.founded,
          CompEmployees: company.employees,
          CompDetails: company.details,
          ID: job.id,
          CompEmail: company.email,
        };
        return newJob;
      })
    );
    setJobs(newJobs);
  };
  return (
    <>
      <MyNavbar />

      <Container>
        <img class="w-full h-64" src={SampleImgUrl} alt="sample" />
        <SearchInput />
        {jobs?.length > 0 ? (
          <HorizContainer>
            {jobs.map((myJob) => (
              <PrimaryJobCard job={myJob} />
            ))}
          </HorizContainer>
        ) : (
          <Typography>No jobs found</Typography>
        )}
      </Container>
    </>
  );
}
