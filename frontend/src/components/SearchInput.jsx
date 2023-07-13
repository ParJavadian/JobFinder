import React, { useState } from "react";
import { IconButton, Input } from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";
import { Select, Option } from "@material-tailwind/react";
import { getCategoryById, jobCategories } from "../constants/Categories";

export default function SearchInput(props) {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [category, setCategory] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      doSearch();
      console.log("do validate");
    }
  };

  const doSearch = async () => {
    // props.jobTitle = "Job3";
    props.onJobTitleChange(jobTitle);
    props.onLocationChange(location);
    props.onCategoryChange(category);
    props.refresh();
    console.log("Search:", jobTitle, location, category, categoryId);
  };

  const handleChange = (e) => {
    setCategoryId(e);
    setCategory(getCategoryById(e));
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex bg-blue-50 flex-row gap-2 w-5/6 rounded-lg border-blue-300 border p-4">
        <Input
          onKeyDown={handleKeyDown}
          variant="outlined"
          label="Job Title"
          type="search"
          className="bg-white"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <Input
          onKeyDown={handleKeyDown}
          variant="outlined"
          label="Location"
          type="search"
          className="bg-white"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Select
          label="Category"
          value={categoryId}
          onChange={handleChange}
          className="bg-white"
        >
          {jobCategories.map((job) => (
            <Option key={job.value} value={job.value}>
              {job.label}
            </Option>
          ))}
        </Select>
        <IconButton onClick={doSearch} className="w-24 h-24 flex-none">
          <Unicons.UilSearch />
        </IconButton>
      </div>
    </div>
  );
}
