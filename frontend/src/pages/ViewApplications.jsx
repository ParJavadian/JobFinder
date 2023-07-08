import React, { useState } from "react";
import Container from "../components/Container";
import HorizContainer from "../components/HorizContainer";
import { Typography, Input, IconButton } from "@material-tailwind/react";
import PersonCard from "../components/PersonCard";
import * as Unicons from "@iconscout/react-unicons";
import AvatarImg from "../images/avatar-1.jpg";

export default function ViewApplications() {
  const [searchValue, setSearchValue] = useState("");

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
  return (
    <>
      <Container>
        <div className="flex items-center justify-center">
          <div className="flex bg-blue-50	flex-row gap-2 rounded-lg border-blue-300 border p-4">
            {" "}
            <div className="w-72">
              <Input
                label="search"
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                value={searchValue}
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
          <HorizContainer>
            {myPersons.map((eachPreson) => (
              <PersonCard person={eachPreson} />
            ))}
          </HorizContainer>
        ) : (
          <Typography>No applicants found</Typography>
        )}
        {/* <HorizContainer>
          <PrimaryJobCard job={myJob} />
          <PrimaryJobCard job={myJob} />
          <PrimaryJobCard job={myJob} />
        </HorizContainer>
        <PrimaryJobCard job={myJob} /> */}
      </Container>
    </>
  );
}
