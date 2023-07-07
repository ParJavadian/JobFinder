import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import * as Unicons from "@iconscout/react-unicons";
import AvatarImg from "../images/avatar-1.jpg";

export default function SidebarSeeker() {
  const logout = () => {
    window.location.href = "/";
  };

  return (
    <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Avatar src={AvatarImg} alt="avatar" size="xl" />
        <Typography variant="h5" color="blue-black" className="mt-3">
          Name Lastname
        </Typography>
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="font-light mt-3"
        >
          email@gmail.com
        </Typography>
      </div>
      <List>
        <Link to="/seeker-dashboard">
          <ListItem
          // onClick={() => {
          //   window.location.href = "/seeker-dashboard";
          // }}
          >
            <ListItemPrefix>
              <Unicons.UilUserCircle className="h-5 w-5" />
            </ListItemPrefix>
            Profile Settings
          </ListItem>
        </Link>

        <Link to="/seeker-dashboard/seek">
          <ListItem
          // onClick={() => {
          //   window.location.href = "/seeker-dashboard/seek";
          // }}
          >
            <ListItemPrefix>
              <Unicons.UilCrosshair className="h-5 w-5" />
            </ListItemPrefix>
            Seek opportunities
          </ListItem>
        </Link>
        <Link to="/seeker-dashboard/history">
          <ListItem
          // onClick={() => {
          //   window.location.href = "/seeker-dashboard/history";
          // }}
          >
            <ListItemPrefix>
              <Unicons.UilHistory className="h-5 w-5" />
            </ListItemPrefix>
            Application History
          </ListItem>
        </Link>

        <hr className="my-2 border-blue-gray-50" />
        <Link to="/seeker-dashboard/change-password">
          <ListItem
          // onClick={() => {
          //   window.location.href = "/seeker-dashboard/change-password";
          // }}
          >
            <ListItemPrefix>
              <Unicons.UilKeySkeleton className="h-5 w-5" />
            </ListItemPrefix>
            Change Password
          </ListItem>
        </Link>
        <ListItem onClick={logout}>
          <ListItemPrefix>
            <Unicons.UilSignout className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
