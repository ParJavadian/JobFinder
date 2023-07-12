import React from "react";
import { Typography, Button, Alert } from "@material-tailwind/react";
import AvatarImg from "../images/avatar-1.jpg";
import * as Unicons from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
import PersonDetailCard from "./PersonDetailCard";
import { useLocation } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function DetailsCompany() {
  const [acceptOpen, setAcceptOpen] = React.useState(false);
  const [rejectOpen, setRejectOpen] = React.useState(false);
  const navigate = useNavigate();
  const location1 = useLocation();
  const {
    Name,
    Lastname,
    Email,
    Profession,
    Degree,
    AvatarSrc,
    Location,
    Languages,
    Detail,
  } = location1.state || {};
  const person = {
    Name,
    Lastname,
    Email,
    Profession,
    Degree,
    AvatarSrc,
    Location,
    Languages,
    Detail,
  };
  const accept = () => {
    setAcceptOpen(true);
  };
  const reject = () => {
    setRejectOpen(true);
  };
  return (
    <>
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
          <div className="flex w-5/6 flex-row items-center">
            <Button
              className="w-auto h-12 ml-auto"
              // variant="outlined"
              color="green"
              onClick={accept}
            >
              Accept
            </Button>
            <Button
              className="w-auto h-12 ml-3 mr-10"
              variant="outlined"
              color="red"
              onClick={reject}
            >
              Reject
            </Button>
          </div>
          <Alert
            open={acceptOpen || rejectOpen}
            color="green"
            className="fixed right-16 w-auto h-auto"
            // className={
            //   "fixed top-16 right-4"
            //   acceptOpen || rejectOpen
            //     ? "max-w-screen-md"
            //     : "max-w-screen-md hidden"
            // }
            icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
            onClose={() => {
              setAcceptOpen(false);
              setRejectOpen(false);
            }}
          >
            <Typography variant="h5" color="white">
              Success
            </Typography>
            <Typography color="white" className="mt-2 font-normal">
              {acceptOpen
                ? "Application accepted succesfully!"
                : "Application rejected succesfully!"}
            </Typography>
          </Alert>
        </div>
      </div>
    </>
  );
}
