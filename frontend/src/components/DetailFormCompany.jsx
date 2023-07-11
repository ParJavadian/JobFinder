import React, { useState } from "react";
import { Input, Button, Textarea, Alert } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

export default function Form() {
  const { state } = useLocation();

  // const [formData, setFormData] = useState({
  //   //defualt values
  //   name: "Google",
  //   email: "google@gmail.com",
  //   field: "Tech",
  //   founded: "1940",
  //   employees: "2bilion",
  //   location: "Silicon Valley",
  //   details: "We used to be a good company before kianoosh left us...",
  // });
  const [formData, setFormData] = useState({
    name: state.company.name,
    field: state.company.field,
    founded: state.company.founded,
    location: state.company.location,
    employees: state.company.employees,
    details: state.company.details,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData: ", formData);
    const formDataForm = new FormData();

    for (var key in formData) {
      formDataForm.append(key, formData[key]);
    }
    e.preventDefault();

    let response = await fetch("http://localhost:8080/edit-profile/company", {
      headers: { Authorization: localStorage.token },
      method: "POST",
      body: formDataForm,
    });
    console.log(response);
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
<<<<<<< HEAD
        {/* Rest of the input fields */}
=======
        {/* <Input
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          variant="static"
          label="Email Address"
          size="lg"
        /> */}
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
>>>>>>> 5985a7800534f77973d7fa35dfa28e055c7dce66
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
