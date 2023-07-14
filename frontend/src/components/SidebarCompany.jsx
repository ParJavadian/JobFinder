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
  console.log(localStorage.token);
  const state = JSON.parse(localStorage.state);
  const company = state.company;
  console.log("in sidebar", state);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <Card className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      {/* <div className="mb-2 p-4">
        <Avatar src={AvatarImg} alt="avatar" size="xl" />
        <Typography variant="h5" color="blue-black" className="mt-3">
          {company.name}
        </Typography>
        <Typography
          variant="paragraph"
          color="blue-gray"
          className="font-light mt-3"
        >
          {company.email}
        </Typography>
      </div> */}
      <div className="flex items-center gap-4">
        <Avatar src={AvatarImg} alt="avatar" size="xl" />
        <div>
          <Typography variant="h6">{company.name}</Typography>
          <Typography variant="small" color="gray" className="font-normal">
            {company.email}
          </Typography>
        </div>
      </div>
      <List className="mt-8">
        <Link to="/company-dashboard" state={state}>
          <ListItem>
            <ListItemPrefix>
              <Unicons.UilUserCircle className="h-5 w-5" />
            </ListItemPrefix>
            Profile Settings
          </ListItem>
        </Link>
        <Link to="/company-dashboard/history" state={state}>
          <ListItem>
            <ListItemPrefix>
              <Unicons.UilHistory className="h-5 w-5" />
            </ListItemPrefix>
            Position History
          </ListItem>
        </Link>
        <Link to="/company-dashboard/new-position" state={state}>
          <ListItem>
            <ListItemPrefix>
              <Unicons.UilPlusCircle className="h-5 w-5" />
            </ListItemPrefix>
            Create New Job Position
          </ListItem>
        </Link>
        <div className="mt-64">
          <hr className="my-2 border-blue-gray-50 mt-10" />
          <ListItem onClick={logout}>
            <ListItemPrefix>
              <Unicons.UilSignout className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </div>
      </List>
    </Card>
  );
}
