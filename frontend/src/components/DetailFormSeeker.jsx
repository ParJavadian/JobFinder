import React, { useState } from "react";
import { Input, Button, Textarea, Alert } from "@material-tailwind/react";

export default function Form() {
  const [formData, setFormData] = useState({
    //defualt values
    name: "Parmida",
    lastname: "Javadian",
    email: "parjavadian@gmail.com",
    profession: "Front-End developer",
    degree: "Diploma",
    location: "Tehran",
    languages: "Persian, English, Italian",
    details: "If you don't hire me, may stone be at your head.",
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
          placeholder="Name"
          value={formData.name}
          label="Name"
          onChange={handleChange}
          size="lg"
        />
        <Input
          name="lastname"
          variant="static"
          placeholder="Last Name"
          value={formData.lastname}
          label="Last Name"
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
          name="profession"
          placeholder="Profession"
          value={formData.profession}
          onChange={handleChange}
          size="lg"
          variant="static"
          label="Profession"
        />
        <Input
          name="degree"
          placeholder="Last Degree"
          value={formData.degree}
          onChange={handleChange}
          size="lg"
          variant="static"
          label="What is your last degree?"
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
        <Input
          name="languages"
          placeholder="Languages"
          value={formData.languages}
          onChange={handleChange}
          size="lg"
          variant="static"
          label="What Languages can you speak?"
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
