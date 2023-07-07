import React from "react";
import { Typography } from "@material-tailwind/react";
import DetailFormSeeker from "./DetailFormSeeker";

export default function DetailsSeeker() {
  return (
    <div className="space-y-10 w-full p-10">
      <Typography variant="h3">Account Details</Typography>
      <DetailFormSeeker />
    </div>
  );
}
