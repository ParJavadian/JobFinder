import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  Button,
} from "@material-tailwind/react";
import ViewAppsSeekerCard from "./ViewAppsSeekerCard";
import * as Unicons from "@iconscout/react-unicons";

export default function SeekerHistory() {
  const state = JSON.parse(localStorage.state);
  const user = state.user;
  const [applications, setApplications] = useState([]);
  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    let url = "http://localhost:8080/applications/user";
    let response2 = await fetch(url, {
      headers: { Authorization: localStorage.token },
    });
    let applications = await response2.json();
    const newApplications = await Promise.all(
      applications.map(async (application) => {
        let params = {
          "job-id": application.job_id,
        };

        let query = Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&");

        let url = "http://localhost:8080/job?" + query;
        let response2 = await fetch(url, {
          headers: { Authorization: localStorage.token },
        });
        let job = await response2.json();
        let params2 = {
          "company-id": job.company_id,
        };

        let query2 = Object.keys(params2)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params2[k])
          )
          .join("&");

        let url2 = "http://localhost:8080/company?" + query2;
        let response3 = await fetch(url2, {
          headers: { Authorization: localStorage.token },
        });
        let company = await response3.json();
        const newApplication = {
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
          YourStatus: application.status,
          AppId: application.id,
        };
        return newApplication;
      })
    );
    setApplications(newApplications);
  };

  const jobOpen = {
    // Default values
    Title: "Manager",
    Company: "Company 1",
    Field: "Tech",
    Salary: "3000$",
    Location: "Tehran",
    Logosrc:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    Time: "Full-time",
    Remote: "In-person",
    Status: "Open",
    YourStatus: "Pending",
  };
  const jobClosed = {
    // Default values
    Title: "Manager",
    Company: "Company 1",
    Field: "Tech",
    Salary: "3000$",
    Location: "Tehran",
    Logosrc:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    Time: "Full-time",
    Remote: "In-person",
    Status: "Closed",
    YourStatus: "Accepted",
  };
  const jobClosedRejected = {
    // Default values
    Title: "Manager",
    Company: "Company 1",
    Field: "Tech",
    Salary: "3000$",
    Location: "Tehran",
    Logosrc:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    Time: "Full-time",
    Remote: "In-person",
    Status: "Closed",
    YourStatus: "Rejected",
  };

  const cards = [
    jobOpen,
    jobClosed,
    jobClosedRejected,
    jobOpen,
    jobClosed,
    jobOpen,
    jobClosedRejected,
    jobOpen,
    jobClosed,
  ];

  return (
    <>
      <div className="pt-8 pb-8 pl-16 pr-16 ">
        <div className="flex items-center pb-4 text-blue-700">
          <Typography style={{ display: "inline-block" }}>
            <Unicons.UilHistory className="h-8 w-8" />
          </Typography>

          <Typography
            variant="h3"
            style={{ display: "inline-block" }}
            className="whitespace-break-spaces"
          >
            {" "}
            History
          </Typography>
        </div>
        <Typography variant="paragraph" className="pb-6">
          Your applications' history and their status
        </Typography>
        {applications.map((card) =>
          card.YourStatus === "pending" ? (
            <Card
              className="p-0 m-4 max-w-[48rem]"
              style={{ backgroundColor: "rgb(148 163 184)" }}
            >
              <div className="flex flex-row items-center">
                <Typography
                  variant="h6"
                  className="[writing-mode:vertical-lr] rotate-180 pl-4 pr-4"
                  color="white"
                >
                  Pending
                </Typography>
                <ViewAppsSeekerCard job={card} colorIn={"rgb(241 245 249)"} />
              </div>
            </Card>
          ) : card.YourStatus === "accepted" ? (
            <Card
              className="p-0 m-4 max-w-[48rem]"
              style={{ backgroundColor: "rgb(13 148 136)" }}
            >
              <div className="flex flex-row items-center">
                <Typography
                  variant="h6"
                  className="[writing-mode:vertical-lr] rotate-180 pl-4 pr-4"
                  color="white"
                >
                  Accepted
                </Typography>
                <ViewAppsSeekerCard
                  job={card}
                  colorIn={"rgb(240 253 250)"}
                  // style={{ display: "inline-block" }}
                  // className="flex-none"
                />
              </div>
            </Card>
          ) : (
            <Card
              className="p-0 m-4 max-w-[48rem]"
              style={{ backgroundColor: "rgb(153 27 27)" }}
            >
              <div className="flex flex-row items-center">
                <Typography
                  variant="h6"
                  className="[writing-mode:vertical-lr] rotate-180 pl-4 pr-4"
                  color="white"
                >
                  Rejected
                </Typography>
                <ViewAppsSeekerCard
                  job={card}
                  colorIn={"rgb(254 242 242)"}
                  // style={{ display: "inline-block" }}
                  // className="flex-none"
                />
              </div>
            </Card>
          )
        )}
      </div>
    </>
  );
}
