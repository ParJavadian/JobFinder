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

export default function CompanyHistory() {
  // Define a list of cards
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
  };

  const cards = [
    jobOpen,
    jobClosed,
    jobOpen,
    jobOpen,
    jobClosed,
    jobOpen,
    jobOpen,
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
            className="whitespace-break-spaces "
          >
            {" "}
            History
          </Typography>
        </div>
        <Typography variant="paragraph" className="pb-6">
          History of positions posted by your company and their status
        </Typography>
        {cards.map((card) =>
          card.Status === "Open" ? (
            <Card
              className="p-0 m-4 max-w-[48rem]"
              style={{ backgroundColor: "rgb(8 145 178)" }}
            >
              <div className="flex flex-row items-center">
                <Typography
                  variant="h6"
                  className="[writing-mode:vertical-lr] rotate-180 pl-4 pr-4"
                  color="white"
                >
                  Open
                </Typography>
                <ViewApplicationsJobCard
                  job={card}
                  colorIn={"rgb(236 254 255)"}
                />
              </div>
            </Card>
          ) : (
            <Card
              className="p-0 m-4 max-w-[48rem]"
              style={{ backgroundColor: "rgb(71 85 105)" }}
            >
              <div className="flex flex-row items-center">
                <Typography
                  variant="h6"
                  className="[writing-mode:vertical-lr] rotate-180 pl-4 pr-4"
                  color="white"
                >
                  Closed
                </Typography>
                <ViewApplicationsJobCard
                  job={card}
                  colorIn={"rgb(226 232 240)"}
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
