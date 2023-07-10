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

export default function PrimaryJobCard({
  job: { Title, Company, Field, Salary, Location, Logosrc, Time, Remote },
}) {
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate("/details", {
      state: {
        title: Title,
        company: Company,
        field:Field,
        location:Location,
        time:Time,
        remote:Remote,
        salary:Salary,

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
            className="p-3 h-32 w-32 rounded-lg border-blue-300 border"
            src={Logosrc}
            alt="logo"
          />
        </CardHeader>
        <CardBody className="pl-0 flex flex-col justify-center">
          <Typography variant="h4" color="blue-gray" className="mb-2 pl-0">
            {Title}
          </Typography>
          <Typography variant="lead" className="text-base font-light">
            {Company}
          </Typography>
          <div className="pt-7 flex items-center justify-center">
            <Typography style={{ display: "inline-block" }}>
              <Unicons.UilBox className="w-4" />
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              className="whitespace-break-spaces text-sm"
            >
              {Field}
              {"    "}
            </Typography>
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
              <Unicons.UilClock className="w-4" />
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              className="whitespace-break-spaces text-sm"
            >
              {Time}
              {"    "}
            </Typography>
            <Typography style={{ display: "inline-block" }}>
              <Unicons.UilMap className="w-4" />
            </Typography>
            <Typography
              style={{ display: "inline-block" }}
              className="whitespace-break-spaces text-sm"
            >
              {Remote}
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
        <CardFooter className="absolute right-0 pt-4 space-y-2 pl-0 pr-0 mr-6 ml-6">
          <div className="flex flex-col space-y-2">
            <Button className="w-40">Apply</Button>
            <Button variant="outlined" className="w-40"  onClick={handleDetails}>
              Details
            </Button>
          </div>
          <div className="flex items-center justify-center absolute left-0">
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
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
