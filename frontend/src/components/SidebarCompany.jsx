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
const AvatarImg =
  "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg";

export default function SidebarCompany() {
  const logout = () => {
    window.location.href = "/";
  };
  return (
    <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Avatar src={AvatarImg} alt="avatar" size="xl" />
        <Typography variant="h5" color="blue-black" className="mt-3">
          Company Name
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
        <Link to="/company-dashboard">
          <ListItem>
            <ListItemPrefix>
              <Unicons.UilUserCircle className="h-5 w-5" />
            </ListItemPrefix>
            Profile Settings
          </ListItem>
        </Link>
        <Link to="/company-dashboard/history">
          <ListItem>
            <ListItemPrefix>
              <Unicons.UilHistory className="h-5 w-5" />
            </ListItemPrefix>
            Application History
          </ListItem>
        </Link>
        <Link to="/company-dashboard/new-position">
          <ListItem>
            <ListItemPrefix>
              <Unicons.UilHistory className="h-5 w-5" />
            </ListItemPrefix>
            Create New Job Position
          </ListItem>
        </Link>
        <hr className="my-2 border-blue-gray-50" />
        <Link to="/company-dashboard/change-password">
          <ListItem>
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
