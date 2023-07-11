import React, { useState } from "react";
import { Input, Button, Textarea, Alert } from "@material-tailwind/react";

export default function DetailFormCompany({ email, password }) {
  const [formData, setFormData] = useState({
    // default values
    name: "Google",
    email: email || "google@gmail.com", // Use the received email prop or a default value
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
    // Disappear after 3 seconds
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
        {/* Rest of the input fields */}
        <Button
          fontSize="xl"
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
    </>
  );
}
