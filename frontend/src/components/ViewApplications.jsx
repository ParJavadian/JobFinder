import React, { useState } from "react";
import { Typography, Input, IconButton } from "@material-tailwind/react";
import PersonCard from "../components/PersonCard";
import * as Unicons from "@iconscout/react-unicons";
import AvatarImg from "../images/avatar-1.jpg";
import { Link, useNavigate } from "react-router-dom";

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
  const [searchValue, setSearchValue] = useState("");
  const Title = "Manager";

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
    Name: "Parmida",
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
  const navigate = useNavigate();

  return (
    <>
      <div className="pt-8 pb-8 pl-16 pr-16 ">
        <div className="flex flex-col  space-y-12 ">
          <div className="flex items-center -ml-6">
            <Link
              onClick={() => {
                navigate(-1);
              }}
            >
              <Typography style={{ display: "inline-block" }}>
                <Unicons.UilAngleLeftB className="w-10 h-10" />
              </Typography>
            </Link>
            {/* <Typography
                            style={{ display: "inline-block" }}
                            className="whitespace-break-spaces text-sm"
                          >
                            {Field}
                            {"    "}
                          </Typography>
                          <Typography style={{ display: "inline-block" }}>
                            <Unicons.UilLocationPoint className="w-4" />
                          </Typography> */}
            <Typography
              variant="h3"
              style={{ display: "inline-block" }}
              className="whitespace-break-spaces ml-6"
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
