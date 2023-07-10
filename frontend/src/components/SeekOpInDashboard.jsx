import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  Button,
} from "@material-tailwind/react";
import ViewApplicationsJobCard from "./ViewApplicationsJobCard";
import * as Unicons from "@iconscout/react-unicons";
import SearchInput from "./SearchInput";
import HorizContainer from "./HorizContainer";
import PrimaryJobCard from "./PrimaryJobCard";
import { useLocation } from "react-router-dom";

export default function SeekOpInDash() {
  // const location1 = useLocation();
  // const { title, company ,field,salary,location,logosrc,time,remote} = location1.state || {};
  // const myJob = {
  //   Title:title,
  //   Company: company,
  //   Field: field,
  //   Salary: salary,
  //   Location: location,
  //   Logosrc:logosrc,
  //   Time: time,
  //   Remote: remote,
  // };
  
  const myJob = {
    Title: "Managerqqqqqqqqqqqqqq",
    Company: "Company 1",
    Field: "Tech",
    Salary: "3000$",
    Location: "Tehran",
    Logosrc:
      "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    Time: "Full-time",
    Remote: "In-person",
  };
  const myJobs = [
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
    myJob,
  ];
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
          <SearchInput />
          {myJobs?.length > 0 ? (
            <HorizContainer>
              {myJobs.map((myJob) => (
                <PrimaryJobCard job={myJob} />
              ))}
            </HorizContainer>
          ) : (
            <Typography>No jobs found</Typography>
          )}
        </div>
      </div>
    </>
  );
}
