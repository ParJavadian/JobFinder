import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";
import SearchInput from "./SearchInput";
import HorizContainer from "./HorizContainer";
import PrimaryJobCard from "./PrimaryJobCard";

export default function SeekOpInDash() {
  const [jobs, setJobs] = useState([]);
    //added
    const [jobTitle, setJobTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [category, setCategory] = useState("");
  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    //TODO filter positions by status
    // TODO same thing in home
    let response = await fetch("http://localhost:8080/jobs", {
      headers: { Authorization: localStorage.token },
    });
    let primaryJobs = await response.json();
        //added
        const filteredJobs = primaryJobs.filter((job) => {
          return (
            //added for filter check these..
            job.title === jobTitle &&
            job.category === category &&
            job.location === searchLocation
            //
          );
        });
    const newJobs = await Promise.all(
      filteredJobs.map(async (job) => {
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
      <div className="pt-8 pb-8 pl-16 pr-16 text-blue-700">
        <div className="flex items-center pb-4">
          <Typography style={{ display: "inline-block" }}>
            <Unicons.UilCrosshair className="h-8 w-8" />
          </Typography>

          <Typography
            variant="h3"
            style={{ display: "inline-block" }}
            className="whitespace-break-spaces"
          >
            {" "}
            Seek Opportunities
          </Typography>
        </div>
        <Typography variant="paragraph" className="pb-6">
          Find jobs that best suit you
        </Typography>
        <div className="-ml-20">
          <SearchInput
              //added for filter
              onJobTitleChange={setJobTitle}
              onLocationChange={setSearchLocation}
              onCategoryChange={setCategory}
          />
          {jobs?.length > 0 ? (
            <HorizContainer>
              {jobs.map((myJob) => (
                <PrimaryJobCard job={myJob} />
              ))}
            </HorizContainer>
          ) : (
            <Typography variant="lead" className="ml-24 mt-12 text-gray-500">
              No jobs found
            </Typography>
          )}
        </div>
      </div>
    </>
  );
}
