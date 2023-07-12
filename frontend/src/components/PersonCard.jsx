import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";

export default function PersonCard({
  person: {
    Name,
    Lastname,
    Email,
    Profession,
    Degree,
    AvatarSrc,
    Location,
    Languages,
    Detail,
    Id,
  },
}) {
  //TODO change based on status
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate("/company-dashboard/person-detail", {
      state: {
        Name,
        Lastname,
        AvatarSrc,
        Profession,
        Location,
        Degree,
        Email,
        Languages,
        Detail,
        Id,
      },
    });
  };
  return (
    <>
      <Card className="h-40 mr-8 ml-8 mt-4 mb-4 w-full flex-row max-w-[48rem]">
        <CardHeader
          shadow={false}
          floated={false}
          className="w-40 shrink-0 m-0 rounded-r-none flex items-center justify-center"
        >
          <img
            className="h-32 w-32 rounded-lg border-blue-300 border"
            src={AvatarSrc}
            alt="avatar"
          />
        </CardHeader>
        <CardBody className="pl-0 flex flex-col justify-center">
          <Typography variant="h4" color="blue-gray" className="mb-2 pl-0">
            {Name} {Lastname}
          </Typography>
          <Typography variant="lead" className="text-base font-light">
            {Profession}
          </Typography>
          <div className="pt-7 flex items-center">
            <Typography style={{ display: "inline-block" }}>
              <Unicons.UilLocationPoint className="w-4" />
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              className="whitespace-break-spaces text-sm"
            >
              {Location}
              {"    "}
            </Typography>
            <Typography style={{ display: "inline-block" }}>
              <Unicons.UilGraduationCap className="w-4" />
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              className="whitespace-break-spaces text-sm"
            >
              {Degree}
              {"    "}
            </Typography>
          </div>
          {/* <Typography style={{ display: "inline-block" }}>
            <Unicons.UilUsdCircle />{" "}
          </Typography>
          <Typography
            style={{ display: "inline-block" }}
            className="whitespace-break-spaces"
          >
            {" "}
            {Salary}
          </Typography>
          <Typography></Typography> */}
        </CardBody>
        <CardFooter className="absolute right-0 pt-6 mt-20 space-y-2 pl-0 pr-0 mr-6 ml-6">
          <div className="flex flex-col space-y-2">
            <Button className="w-40" onClick={handleDetails}>
              View Details
            </Button>
            {/* <Button variant="outlined" className="w-40">
              Details
            </Button> */}
          </div>
          {/* <div className="flex items-center justify-center absolute left-0">
            <Typography style={{ display: "inline-block" }}>
              <Unicons.UilUsdCircle className="w-4" />{" "}
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              className="whitespace-break-spaces text-sm"
            >
              {" "}
              {Salary}
            </Typography>
          </div> */}
        </CardFooter>
      </Card>
    </>
  );
}
