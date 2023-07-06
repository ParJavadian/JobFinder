import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemPrefix,
  Input,
  Button,
} from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";
import AvatarImg from "../images/avatar.webp";

export default function Form() {

    const [formData, setFormData] = useState({
        //defualt values
        name: 'name',
        username: 'username',
        email: 'email@gmail.com',
        company: 'company',
        founded: 'founded',
        employees: 'employees',
        location: 'location',
        details: 'details'
      });
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with the form data
    console.log("formDataaaa: ",formData);
  };



    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
        <h4>
          <span className="bullet-point"></span>Name
        </h4>
        <Input
          name="name"
          placeholder={formData.name}
          value={formData.name}
          onChange={handleChange}
          size="lg"
        />
        <h4>
          <span className="bullet-point"></span>Username
        </h4>
        <Input
          name="username"
          placeholder={formData.username}

          value={formData.username}
          onChange={handleChange}
          size="lg"
        />
        <h4>
          <span className="bullet-point"></span>Email address
       </h4>
        <Input
          name="email"
          placeholder={formData.email}
          value={formData.email}
          onChange={handleChange}
          size="lg"
        />
        <h4>
          <span className="bullet-point"></span>Company field
        </h4>
        <Input
          name="company"
          placeholder={formData.company}
          value={formData.company}
          onChange={handleChange}
          size="lg"
        />
        <h4>
          <span className="bullet-point"></span>When was your company founded?
        </h4>
        <Input
          name="founded"
          placeholder={formData.founded}
          value={formData.founded}
          onChange={handleChange}
          size="lg"
        />
        <h4>
          <span className="bullet-point"></span>Number of employees
        </h4>
        <Input
          name="employees"
          placeholder={formData.employees}
          value={formData.employees}
          onChange={handleChange}
          size="lg"
        />
        <h4>
          <span className="bullet-point"></span>Location
        </h4>
        <Input
          name="location"
          placeholder={formData.location}
          value={formData.location}
          onChange={handleChange}
          size="lg"
        />
        <h4>
          <span className="bullet-point"></span>More details
        </h4>
        <Input
          name="details"
          placeholder={formData.details}
          value={formData.details}
          onChange={handleChange}
          size="lg"
        />
        <Button variant="gradient" fullWidth onClick={handleSubmit}>
          Save changes
        </Button>
      </form>
    );
  }