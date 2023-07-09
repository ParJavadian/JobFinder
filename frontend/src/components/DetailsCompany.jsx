import React from "react";
import { Typography } from "@material-tailwind/react";
import DetailFormCompany from "./DetailFormCompany";
import { useLocation } from "react-router-dom";
export default function DetailsCompany() {
  const location = useLocation();
  //get values of navigation
  const { email, password } = location.state || {};
  return (
    <div className="space-y-10 w-full p-10">
      <Typography variant="h3">Account Details</Typography>
      <DetailFormCompany />
    </div>
  );
}
