import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";
import { useLocation } from "react-router-dom";

export default function JobDetailCard({
  job: {  Detail },
  company: {
    name,
    email,
    // field,
    founded,
    employees,
    // location,
    details,
    Logosrc,
  },
}) {
  const location1 = useLocation();
  const { title, company,field ,location,time,remote,salary} = location1.state || {};
  return (
    <>
      <div className="w-96">
        <Card
          color="transparent"
          shadow={false}
          className="w-full max-w-[26rem]"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  {title}
                </Typography>
              </div>
              <Typography color="blue-gray">{company}</Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <List>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilBox className="h-5 w-5" />
                </ListItemPrefix>
                {field}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilDollarSignAlt className="h-5 w-5" />
                </ListItemPrefix>
                {salary}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilLocationPoint className="h-5 w-5" />
                </ListItemPrefix>
                {location}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilHourglass className="h-5 w-5" />
                </ListItemPrefix>
                {time}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilMap className="h-5 w-5" />
                </ListItemPrefix>
                {remote}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilNotes className="h-5 w-5" />
                </ListItemPrefix>
                <div>{Detail}</div>
              </ListItem>
            </List>
          </CardBody>
        </Card>
        <hr className="my-2 border-blue-gray-100" />
        <Card
          color="transparent"
          shadow={false}
          className="w-full max-w-[26rem]"
        >
          <CardHeader
            color="transparent"
            floated={false}
            shadow={false}
            className="mx-0 flex items-center gap-4 pt-0 pb-8"
          >
            <Avatar size="lg" variant="circular" src={Logosrc} alt="avatar" />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                  {name}
                </Typography>
              </div>
              <Typography color="blue-gray">{email}</Typography>
            </div>
          </CardHeader>
          <CardBody className="mb-6 p-0">
            <List>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilBox className="h-5 w-5" />
                </ListItemPrefix>
                {field}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilCalender className="h-5 w-5" />
                </ListItemPrefix>
                {founded}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilUsersAlt className="h-5 w-5" />
                </ListItemPrefix>
                {employees}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilLocationPoint className="h-5 w-5" />
                </ListItemPrefix>
                {location}
              </ListItem>
              <ListItem className="pointer-events-none">
                <ListItemPrefix>
                  <Unicons.UilNotes className="h-5 w-5" />
                </ListItemPrefix>
                <div>{details}</div>
              </ListItem>
            </List>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
