import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/Login";
import { useNavigate } from "react-router-dom";


export default function LoginCard() {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/Login");
  };
  const handleSignUp = () => {
    navigate("/SignUp");
  };
 
  return (
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white"  >
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input label="Email" size="lg" />
        <Input label="Password" size="lg" />
        {/* <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div> */}
      </CardBody>
      <CardFooter className="pt-0">
        
        <Button variant="gradient" fullWidth   onClick={handleSignIn}>
          Sign In
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Don't have an account?
          <Typography
            as="a"
            href="/SignUp"
            variant="small"
            color="blue"
            className="ml-1 font-bold"
          >
            Sign up
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
}
