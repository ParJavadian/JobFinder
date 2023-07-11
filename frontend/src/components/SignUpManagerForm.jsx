import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";

export default function SignUpManagerForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [field, setField] = useState("");
  const [location, setLocation] = useState("");
  const jsonData = {
    email: email,
    password: password,
    name: name,
    field: field,
    location: location,
    employees: "0",
  };
  async function handleClick(e) {
    const formData = new FormData();

    for (var key in jsonData) {
      formData.append(key, jsonData[key]);
    }
    e.preventDefault();

    let response = await fetch("http://localhost:8080/register/company", {
      method: "POST",
      body: formData,
    });
    let result = await response.json();
    if (response.ok) {
      console.log(result.message);
    } else {
      console.log(result.error);
    }
  }
  return (
    <Card color="transparent" shadow={false} className="w-96">
      <Typography variant="h4" color="blue-gray">
        Sign Up as a Company
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Create a company account.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input
            size="lg"
            label="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          {/* <Input type="tel" size="lg" label="Phone number" required /> */}
          <Input
            type="password"
            size="lg"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            size="lg"
            label="What is your company's field?"
            value={field}
            onChange={(e) => setField(e.target.value)}
          />
          <Input
            size="lg"
            label="Where is the company located?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
  );
}
