import React, { useState } from "react";
import { Input, Button, Textarea, Alert } from "@material-tailwind/react";

export default function Form() {
  const [formData, setFormData] = useState({
    //defualt values
    name: "Google",
    email: "google@gmail.com",
    field: "Tech",
    founded: "1940",
    employees: "2bilion",
    location: "Silicon Valley",
    details: "We used to be a good company before kianoosh left us...",
  });

  const [changesApplied, setChangesApplied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setChangesApplied(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData: ", formData);
    setChangesApplied(true);
    // disapear after 3 seconds
    setTimeout(() => {
      setChangesApplied(false);
    }, 3000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-10">
        <Input
          name="name"
          variant="static"
          placeholder="Company name"
          value={formData.name}
          label="Name"
          onChange={handleChange}
          size="lg"
        />
        <Input
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          variant="static"
          label="Email Address"
          size="lg"
        />
        <Input
          name="company"
          placeholder="Company field"
          value={formData.field}
          onChange={handleChange}
          size="lg"
          variant="static"
          label="Company Field"
        />
        <Input
          name="founded"
          placeholder="When was your company founded?"
          value={formData.founded}
          onChange={handleChange}
          size="lg"
          variant="static"
          label="When was your company founded?"
        />
        <Input
          name="employees"
          placeholder="Number of employees"
          value={formData.employees}
          onChange={handleChange}
          size="lg"
          variant="static"
          label="Number of employees"
        />
        <Input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          size="lg"
          variant="static"
          label="Location"
        />
        <Textarea
          name="details"
          placeholder="Details"
          value={formData.details}
          onChange={handleChange}
          size="lg"
          variant="static"
          label="Details"
        />
        <Button
          font-size="xl"
          // className="text-black absolute right-0"
          variant="gradient"
          onClick={handleSubmit}
        >
          Save changes
        </Button>
      </form>

      {changesApplied && (
        <Alert
          color="green"
          size="sm"
          className="fixed top-4 right-4 rounded-md bg-green-500 text-white py-6 px-4 text-lg w-68"
        >
          Changes applied successfully!
        </Alert>
      )}
      {/* </div> */}
    </>
  );
}
