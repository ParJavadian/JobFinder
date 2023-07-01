import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";

export default function PrimaryJobCard({
  job: { Title, Company, Field, Salary, Location },
}) {
  return (
    <>
      <Card className="mt-6 w-96">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            {Title}
          </Typography>
          <Typography style={{ display: "inline-block" }}>
            <Unicons.UilBuilding />
          </Typography>
          <Typography
            className="whitespace-break-spaces"
            style={{ display: "inline-block" }}
          >
            {" "}
            {Company}
          </Typography>
          <Typography></Typography>
          <Typography style={{ display: "inline-block" }}>
            <Unicons.UilBox />
          </Typography>
          <Typography
            style={{ display: "inline-block" }}
            className="whitespace-break-spaces"
          >
            {" "}
            {Field}
          </Typography>
          <Typography></Typography>
          <Typography style={{ display: "inline-block" }}>
            <Unicons.UilUsdCircle />{" "}
          </Typography>
          <Typography
            style={{ display: "inline-block" }}
            className="whitespace-break-spaces"
          >
            {" "}
            {Salary}
          </Typography>
          <Typography></Typography>
          <Typography style={{ display: "inline-block" }}>
            <Unicons.UilLocationPoint />
          </Typography>
          <Typography
            style={{ display: "inline-block" }}
            className="whitespace-break-spaces"
          >
            {" "}
            {Location}
          </Typography>
          <Typography></Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Button>Details</Button>
        </CardFooter>
      </Card>
    </>
  );
}
