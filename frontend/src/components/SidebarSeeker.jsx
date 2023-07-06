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
            <Unicons.UilUserCircle color="blue" className="mb-5 custom-header" />
          </ListItemPrefix>
          Profile Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Unicons.UilCrosshair color="blue" className="mb-5 custom-header" />
          </ListItemPrefix>
          Seek opportunities
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Unicons.UilHistory color="blue" className="mb-5 custom-header" />
          </ListItemPrefix>
          Application History
        </ListItem>
        <hr className="my-2 border-blue-gray-50" />

        <ListItem>
          <ListItemPrefix>
            <Unicons.UilKeySkeleton color="blue" className="mb-5 custom-header" />
          </ListItemPrefix>
          Change Password
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Unicons.UilSignout color="blue" className="mb-5 custom-header" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
