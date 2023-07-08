import React from "react";
import SidebarSeeker from "../components/SidebarSeeker";
import { Route, Routes } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import SearchInput from "../components/SearchInput";
import SignUpSeekerForm from "../components/SignUpSeekerForm";
import DetailsSeeker from "../components/DetailsSeeker";
import SeekOpInDash from "../components/SeekOpInDashboard";

export default function SeekerDashboard() {
  return (
    <>
      <SidebarSeeker />
      <div className="pl-64 w-full">
        <div className="pl-16 w-full">
          <Routes>
            <Route path="/" element={<DetailsSeeker />}></Route>
            <Route path="/seek" element={<SeekOpInDash />}></Route>
            <Route path="/history" element={<LoginCard />}></Route>
            <Route
              path="/change-password"
              element={<SignUpSeekerForm />}
            ></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}
