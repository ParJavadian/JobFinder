import React, { useState } from "react";
import {
  Input,
  Button,
  Textarea,
  Alert,
  Typography,
} from "@material-tailwind/react";
import { useLocation } from "react-router-dom";

export default function Form() {
  const { state } = useLocation();
  // console.log("in form:", state);
  /*const [formData, setFormData] = useState({
    //defualt values
    name: "Parmida",
    lastname: "Javadian",
    email: "parjavadian@gmail.com",
    profession: "Front-End developer",
    degree: "Diploma",
    location: "Tehran",
    languages: "Persian, English, Italian",
    details: "If you don't hire me, may stone be at your head.",
  });*/
  const [formData, setFormData] = useState({
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    profession: state.user.profession,
    degree: state.user.degree,
    location: state.user.location,
    languages: state.user.languages,
    details: state.user.details,
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

    let response = await fetch("http://localhost:8080/edit-profile/user", {
      headers: { Authorization: localStorage.token },
      method: "POST",
      body: formDataForm,
    });
    console.log(response);
    // let result = await response.json();
    // if (response.ok) {
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
          name="firstname"
          variant="static"
          placeholder="Name"
          value={formData.firstname}
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
        {/* <label class="flex w-full h-full select-none pointer-events-none font-normal truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all text-sm peer-focus:text-sm after:content[' '] after:block after:w-full after:absolute after:-bottom-2.5 after:border-b-2 after:scale-x-0 peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight text-blue-gray-500 peer-focus:text-blue-500 after:border-blue-500 peer-focus:after:border-blue-500">
          Email Address
        </label> */}
        {/* <Typography variant="paragraph" color="blue-gray" className="text-sm">
          Email Address
        </Typography> */}
        {/* <Input
          // name="email"
          // placeholder="Email Address"
          value={formData.email}
          // onChange={handleChange}
          // variant="standard"
          label="Email Address - non-changable"
          // size="lg"
          disabled
          // className="bg-rose-950"
        /> */}
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
