import React, { useState } from 'react';
import {
  Input,
  Button,
} from "@material-tailwind/react";
import {  Alert } from "@material-tailwind/react";

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


  const [changesApplied, setChangesApplied] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
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
        {/* <div className="h-screen  items-center justify-center"> */}

        <form onSubmit={handleSubmit} className="space-y-6">

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
        <Button font-size='xl'className="text-black" variant="gradient" fullWidth onClick={handleSubmit}>
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