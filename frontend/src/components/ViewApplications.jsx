import React, { useState, useEffect } from "react";
import { Typography, Input, IconButton } from "@material-tailwind/react";
import PersonCard from "../components/PersonCard";
import * as Unicons from "@iconscout/react-unicons";
import AvatarImg from "../images/avatar-1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// export default function ViewApplications({
//   job: {
//     Title,
//     Company,
//     Field,
//     Salary,
//     Location,
//     Logosrc,
//     Time,
//     Remote,
//     Status,
//   },
// }) {
export default function ViewApplications() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  // const Title = "Manager";

  const location = useLocation();
  const {
    Title,
    Company,
    Field,
    Salary,
    Location,
    Logosrc,
    Time,
    Remote,
    Detail,
    CompField,
    CompFounded,
    CompEmployees,
    CompDetails,
    ID,
    CompEmail,
  } = location.state || {};

  const [applications, setApplications] = useState([]);
  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    let params = {
      "job-id": ID,
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    let url = "http://localhost:8080/applications/job?" + query;
    let response2 = await fetch(url, {
      headers: { Authorization: localStorage.token },
    });
    let applications = await response2.json();
    console.log(applications);
    // const newApplications = await Promise.all(
    //   applications.map(async (application) => {
    //     let params = {
    //       "company-id": application.company_id,
    //     };

    //     let query = Object.keys(params)
    //       .map(
    //         (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
    //       )
    //       .join("&");

    //     let url = "http://localhost:8080/company?" + query;
    //     let response2 = await fetch(url, {
    //       headers: { Authorization: localStorage.token },
    //     });
    //     let company = await response2.json();
    //     const newJob = {
    //       Title: application.title,
    //       Field: application.field,
    //       Salary: application.salary,
    //       Location: company.location,
    //       Company: company.name,
    //       Logosrc:
    //         "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    //       Time: application.time,
    //       Remote: application.remoteStatus,
    //       Detail: application.details,
    //       CompField: company.field,
    //       CompFounded: company.founded,
    //       CompEmployees: company.employees,
    //       CompDetails: company.details,
    //       ID: application.id,
    //       CompEmail: company.email,
    //     };
    //     return newJob;
    //   })
    // );
    // setApplications(newApplications);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      doSearch();
      console.log("do validate");
    }
  };

  const doSearch = () => {
    //search...
    //values are in jobTitle and location and category
    console.log("Search:", searchValue);
  };

  const myPerson = {
    Name: "p",
    Lastname: "Javadian",
    Email: "parjavadian@gmail.com",
    Profession: "Front-end Developer",
    Degree: "Diploma",
    AvatarSrc: AvatarImg,
    Location: "Tehran",
    Languages: "Persian",
    Detail: "Seriously?",
  };
  const myPersons = [
    myPerson,
    myPerson,
    myPerson,
    myPerson,
    myPerson,
    myPerson,
  ];

  return (
    <>
      <div className="pt-8 pb-8 pl-16 pr-16 ">
        <div className="flex flex-col  space-y-12 ">
          <div className="flex items-center -ml-6 ">
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
              Applicants for position {Title}
            </Typography>
          </div>
          <div className="flex w-72  ml-12  bg-blue-50	flex-row gap-2 rounded-lg border-blue-300 border p-3">
            {" "}
            <div className="w-72">
              <Input
                label="search"
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                value={searchValue}
                className="bg-white"
                // icon={
                //   <IconButton onClick={doSearch} className="w-24 h-24 flex-none">
                //     <Unicons.UilSearch />
                //   </IconButton>
                // }
              />
            </div>
            <IconButton onClick={doSearch} className="w-24 h-24 flex-none">
              <Unicons.UilSearch />
            </IconButton>
          </div>
        </div>
        {myPersons?.length > 0 ? (
          <div className="flex flex-col">
            {myPersons.map((eachPreson) => (
              <PersonCard person={eachPreson} />
            ))}
          </div>
        ) : (
          <Typography>No applicants found</Typography>
        )}
        {/* <HorizContainer>
          <PrimaryJobCard job={myJob} />
          <PrimaryJobCard job={myJob} />
          <PrimaryJobCard job={myJob} />
        </HorizContainer>
        <PrimaryJobCard job={myJob} /> */}
      </div>
    </>
  );
}
