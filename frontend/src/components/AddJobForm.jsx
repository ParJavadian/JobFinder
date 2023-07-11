import React, { useState } from "react";
import { Input, Button, Textarea, Alert } from "@material-tailwind/react";

export default function AddJobForm() {
  // const state = JSON.parse(localStorage.state);
  // const company = state.company;
  const [formData, setFormData] = useState({
    title: "",
    field: "",
    time: "",
    remote: "",
    salary: "",
    details: "",
  });
  //   {
  //   //defualt values
  //   name: "Google",
  //   email: "google@gmail.com",
  //   field: "Tech",
  //   founded: "1940",
  //   employees: "2bilion",
  //   location: "Silicon Valley",
  //   details: "We used to be a good company before kianoosh left us...",
  // }

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
    const formDataForm = new FormData();

    for (var key in formData) {
      formDataForm.append(key, formData[key]);
    }
    e.preventDefault();

    let response = await fetch("http://localhost:8080/job", {
      method: "POST",
      body: formDataForm,
      headers: { Authorization: localStorage.token },
    });
    let result = await response.json();
    if (response.ok) {
      console.log(result.message);
    } else {
      console.log(result.error);
    }
    console.log("formData: ", formData);
    setChangesApplied(true);
    // disapear after 3 seconds
    setTimeout(() => {
      setChangesApplied(false);
    }, 3000);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-8">
        <Input
          variant="static"
          placeholder="Job Title"
          label="Job Title"
          // onChange={handleChange}
          size="lg"
          required
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <Input
          placeholder="Field"
          variant="static"
          label="Field"
          size="lg"
          required
          name="field"
          value={formData.field}
          onChange={handleChange}
        />
        <Input
          placeholder="Time"
          size="lg"
          variant="static"
          label="Is the job part-time or full-time?"
          required
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <Input
          placeholder="In-person or remote"
          size="lg"
          variant="static"
          label="Is the position remote or in-person?"
          required
          name="remote"
          value={formData.remote}
          onChange={handleChange}
        />
        <Input
          placeholder="Salary"
          size="lg"
          variant="static"
          label="Salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />
        {/* <Input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          size="lg"
          variant="static"
          label="Location"
        /> */}
        <Textarea
          placeholder="Details"
          size="lg"
          variant="static"
          label="Add Any more details here"
          name="details"
          value={formData.details}
          onChange={handleChange}
        />
        <Button
          font-size="xl"
          // className="text-black absolute right-0"
          variant="gradient"
          onClick={handleSubmit}
        >
          Create Position
        </Button>
      </form>

      {changesApplied && (
        <Alert
          color="green"
          size="sm"
          className="fixed top-4 right-4 rounded-md bg-green-500 text-white py-6 px-4 text-lg w-68"
        >
          Position Created Successfully!
        </Alert>
      )}
      {/* </div> */}
    </>
  );
}
