import React from "react";
import { Typography } from "@material-tailwind/react";
import DetailFormCompany from "./DetailFormCompany";

export default function DetailsCompany() {
  return (
    <div className="space-y-10 w-full p-10">
      <Typography variant="h3">Account Details</Typography>
      <DetailFormCompany />
    </div>
  );
}
