import React, { useState } from "react";
import { Input, Button, Textarea, Alert } from "@material-tailwind/react";

export default function Form() {
  const state = JSON.parse(localStorage.state);
  const [formData, setFormData] = useState({
    name: state.company.name,
    field: state.company.field,
    founded: state.company.founded,
    location: state.company.location,
    employees: state.company.employees,
    details: state.company.details,
    email: state.company.email,
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
    localStorage.setItem("state", JSON.stringify({ company: formData }));
    setChangesApplied(true);
    // disapear after 3 seconds
    setTimeout(() => {
      setChangesApplied(false);
    }, 3000);
    window.location.reload(false);
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
          name="field"
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
