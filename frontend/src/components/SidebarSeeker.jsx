import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
} from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";
import AvatarImg from "../images/avatar-1.jpg";

export default function Example() {
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
        <ListItem>
          <ListItemPrefix>
            <Unicons.UilUserCircle className="h-5 w-5" />
          </ListItemPrefix>
          Profile Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Unicons.UilCrosshair className="h-5 w-5" />
          </ListItemPrefix>
          Seek opportunities
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Unicons.UilHistory className="h-5 w-5" />
          </ListItemPrefix>
          Application History
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />

        <ListItem>
          <ListItemPrefix>
            <Unicons.UilKeySkeleton className="h-5 w-5" />
          </ListItemPrefix>
          Change Password
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Unicons.UilSignout className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
