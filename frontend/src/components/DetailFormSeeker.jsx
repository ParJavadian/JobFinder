import React, { useState } from "react";
import { Input, Button, Textarea, Typography } from "@material-tailwind/react";
import ImgUpload from "./ImgUpload";
import sampleAvatar from "../images/sample.png";
export default function Form() {
  const [imgState, setImgState] = useState({
    file: "",
    imagePreviewUrl: sampleAvatar,
  });
  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setImgState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  };
  const state = JSON.parse(localStorage.state);
  console.log("statttt", state);
  const [formData, setFormData] = useState({
    firstname: state.user.firstname,
    lastname: state.user.lastname,
    profession: state.user.profession,
    degree: state.user.degree,
    location: state.user.location,
    languages: state.user.languages,
    details: state.user.details,
    email: state.user.email,
    id: state.user.id,
  });

  // const [changesApplied, setChangesApplied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // setChangesApplied(false);
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
    localStorage.setItem("state", JSON.stringify({ user: formData }));
    // setChangesApplied(true);
    // // disapear after 3 seconds
    // setTimeout(() => {
    //   setChangesApplied(false);
    // }, 3000);
    window.location.reload(false);
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
        <ImgUpload onChange={photoUpload} src={imgState.imagePreviewUrl} />

        <Button font-size="xl" variant="gradient" onClick={handleSubmit}>
          Save changes
        </Button>
      </form>
    </>
  );
}
