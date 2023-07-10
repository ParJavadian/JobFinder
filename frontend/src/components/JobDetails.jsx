import Container from "./Container";
import { Typography } from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
import JobDetailCard from "./JobDetailCard";

export default function JobDetails() {
  const navigate = useNavigate();

  const myJob = {
    Title: "Manager",
    Company: "Company 1",
    Field: "Tech",
    Salary: "3000$",
    Location: "Tehran",
    Time: "Full-time",
    Remote: "In-person",
  };
  const myCompany = {
    //defualt values
    name: "Google",
    email: "google@gmail.com",
    field: "Tech",
    founded: "1940",
    employees: "2bilion",
    location: "Silicon Valley",
    details: "We used to be a good company before kianoosh left us...",
    Logosrc:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
  };
  return (
    <>
      <div className="items-center justify-center">
        <div className="mt-5  m-auto flex-col m-auto space-y-5 w-1/2 items-center justify-center">
          {/* <div className="flex flex-col  space-y-8 "> */}
          <div className="flex items-center ml-24">
            <Link
              onClick={() => {
                navigate(-1);
              }}
            >
              <Typography style={{ display: "inline-block" }}>
                <Unicons.UilAngleLeftB className="w-10 h-10" />
              </Typography>
            </Link>
            <Typography
              variant="h3"
              style={{ display: "inline-block" }}
              className="whitespace-break-spaces ml-6 text-blue-700"
            >
              Job Details
            </Typography>
          </div>
          {/* </div> */}
          {/* </div> */}
          <div className="flex items-center justify-center">
            <JobDetailCard job={myJob} company={myCompany} />
          </div>
        </div>
      </div>
    </>
  );
}