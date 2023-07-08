import React from "react";
import { Typography } from "@material-tailwind/react";
import AddJobForm from "./AddJobForm";

export default function DetailsCompany() {
  return (
    <div className="space-y-10 w-full p-10">
      <Typography variant="h3">Create New Job Position</Typography>
      <AddJobForm />
    </div>
  );
}
