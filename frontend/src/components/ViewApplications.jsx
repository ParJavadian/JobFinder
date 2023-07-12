import React, { useState, useEffect } from "react";
import {
  Typography,
  Input,
  IconButton,
  Button,
} from "@material-tailwind/react";
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
    const newApplications = await Promise.all(
      applications.map(async (application) => {
        console.log("apllication:", application);
        let params = {
          "user-id": application.user_id,
        };

        let query = Object.keys(params)
          .map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          )
          .join("&");

        let url = "http://localhost:8080/user?" + query;
        let response2 = await fetch(url, {
          headers: { Authorization: localStorage.token },
        });
        let user = await response2.json();
        const newApplication = {
          Name: user.firstname,
          Lastname: user.lastname,
          Email: user.email,
          Profession: user.profession,
          Degree: user.degree,
          AvatarSrc: AvatarImg,
          Location: user.location,
          Languages: user.languages,
          Detail: user.details,
          Id: application.id,
          // JobId: application.job_id,
        };
        return newApplication;
      })
    );
    setApplications(newApplications);
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
  //TODO after api is defined in backend
  const closePosition = () => {};

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
          <div className="flex w-5/6 flex-row items-center">
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
            <Button
              className="w-auto h-12 ml-auto mr-6"
              variant="outlined"
              color="red"
              onClick={closePosition}
            >
              Close position
            </Button>
          </div>
        </div>
        {applications?.length > 0 ? (
          <div className="flex flex-col">
            {applications.map((eachPreson) => (
              <PersonCard person={eachPreson} />
            ))}
          </div>
        ) : (
          <Typography variant="lead" className="ml-16 mt-12 text-gray-500">
            No applicants found
          </Typography>
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
