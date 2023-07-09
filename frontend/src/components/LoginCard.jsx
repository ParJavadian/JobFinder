import React, { useState ,useEffect} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    let timer;
    if (error) {
      // Set a timeout to close the alert after 3 seconds
      timer = setTimeout(() => {
        closeAlert();
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [error]);

  const handleSignIn = async () => {
    try {
      // Send login request to the backend
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Login successful, retrieve the token from the response
        const { token } = await response.json();
        localStorage.setItem("token", token);
        console.log("token:", token);
      } else {
        // const errorResponse = await response.text();
        setError("Please enter valid Email and Password");
      }
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  const closeAlert = () => {
    setError("");
  };

  return (
    <Card className="w-96">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Email"
          size="lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          size="lg"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth onClick={handleSignIn}>
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
      {error && (
  <div className="fixed top-16 right-4 bg-red-300 text-white px-4 py-2 rounded">
    <span>{error}</span>
    <button
      className="ml-2 text-white font-bold"
      onClick={closeAlert}
    >
      X
    </button>
  </div>
)}

    </Card>
  );
}
