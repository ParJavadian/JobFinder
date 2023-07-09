import React from "react";
import { Typography } from "@material-tailwind/react";
import AvatarImg from "../images/avatar-1.jpg";
import * as Unicons from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
import PersonDetailCard from "./PersonDetailCard";

export default function DetailsCompany() {
  const navigate = useNavigate();

  const person = {
    Name: "Parmida",
    Lastname: "Javadian",
    Email: "parjavadian@gmail.com",
    Profession: "Front-end Developer",
    Degree: "Diploma",
    AvatarSrc: AvatarImg,
    Location: "Tehran",
    Languages: "Persian",
    Detail:
      "Hello I am parmida javadian and i am trying to write this long text here to check \r\n if it is displayed nicely.",
  };
  return (
    <div className="pt-8 pb-8 pl-16 pr-16 ">
      <div className="flex flex-col  space-y-8 ">
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
            Applicant Details
          </Typography>
        </div>
        <div className="flex-col ml-10 space-y-4 justify-center">
          <PersonDetailCard person={person} />
        </div>
      </div>
    </div>
  );
}
