import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import Container from "../components/Container";
import MyNavbar from "../components/MyNavBar";
import LoginCard from "../components/LoginCard";

export default function SignUp() {
  return (
    <>
      <MyNavbar />
      <div className="flex items-center justify-center mt-32">
        <LoginCard />
      </div>
    </>
  );
}
