import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";

export default function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const jsonData = {
    email: email,
    password: password,
  };
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  const handleSignIn = async (e) => {
    try {
      e.preventDefault();
      // Send login request to the backend
      const formData = new FormData();

      for (var key in jsonData) {
        formData.append(key, jsonData[key]);
      }
      e.preventDefault();

      let response = await fetch("http://localhost:8080/login", {
        method: "POST",
        body: formData,
      });
      let result = await response.json();
      if (response.ok) {
        console.log(response);
        console.log(result);
        const { token, role } = result;
        const user = {
          id: 6,
          firstname: "Name1",
          lastname: "Name2",
          email: "email@gmail.comaefv",
          profession: "myprof",
          degree: "medeg",
          location: "myloc",
          languages: "mylang",
          details: "mydet",
          password: "mypass",
        };
        const company = {
          id: 3,
          name: "Good Company",
          field: "EE",
          founded: "2002",
          location: "Baku",
          employees: "23",
          details: "very good ha.",
          email: "email.",
        };
        localStorage.setItem("token", token);
        console.log("token:", token, "token end");
        if (role === "company") {
          navigate("/company-dashboard", { state: { company } });
        } else if (role === "user") {
          navigate("/seeker-dashboard", { state: { user } });
        } else {
          setError("Invalid token");
        }
      } else {
        console.log(result.error);
        setError("Please enter valid Email and Password");
      }

      // if (response.ok) {
      //   // Login successful, retrieve the token from the response
      //   //should say in token that user is company or jobseeker
      //   const { token, role } = await response.json();
      //   localStorage.setItem("token", token);
      //   console.log("token:", token);
      //   if (role === "company") {
      //     navigate("/company-dashboard", { state: { email, password } });
      //   } else if (role === "user") {
      //     navigate("/seeker-dashboard", { state: { email, password } });
      //   } else {
      //     setError("Invalid token");
      //   }
      // } else {
      //   // const errorResponse = await response.text();
      //   setError("Please enter valid Email and Password");
      // }
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
          <button className="ml-2 text-white font-bold" onClick={closeAlert}>
            X
          </button>
        </div>
      )}
    </Card>
  );
}
