import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export default function SignUpSeekerForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstname, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const jsonData = {
    email: email,
    password: password,
    firstname: firstname,
    lastname: lastname,
  };
  const [error, setError] = useState("");
  useEffect(() => {
    let timer;
    if (error) {
      // Set a timeout to close the alert after 3 seconds
      timer = setTimeout(() => {
        closeAlert();
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [error]);
  const closeAlert = () => {
    setError("");
  };
  async function handleClick(e) {
    const formData = new FormData();

    for (var key in jsonData) {
      formData.append(key, jsonData[key]);
    }
    e.preventDefault();

    let response = await fetch("http://localhost:8080/register/user", {
      method: "POST",
      body: formData,
    });
    let result = await response.json();
    if (response.ok) {
      console.log(result.message);
      navigate("/login");
    } else {
      console.log(result.error);
      setError(result.error);
    }
  }
  return (
    <>
      {error && (
        <Alert
          color="red"
          className="fixed right-32 w-auto h-auto top-40"
          icon={<XCircleIcon className="mt-px h-6 w-6" />}
          onClose={closeAlert}
        >
          <Typography variant="h5" color="white">
            Error
          </Typography>
          <Typography color="white" className="mt-2 font-normal">
            {error}
          </Typography>
        </Alert>
      )}
      <Card color="transparent" shadow={false} className="w-96">
        <Typography variant="h4" color="blue-gray">
          Sign Up as a Job Seeker
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Create a job seeker account.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" id="formElem">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              value={firstname}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              size="lg"
              label="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <Input
              type="email"
              size="lg"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {/* <Input
            type="tel"
            size="lg"
            label="Phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          /> */}
            <Input
              type="password"
              size="lg"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button className="mt-6" fullWidth onClick={handleClick}>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a
              href="/Login"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </>
  );
}
