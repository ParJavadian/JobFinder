import React, { useState } from "react";
import { IconButton, Input } from "@material-tailwind/react";
import * as Unicons from "@iconscout/react-unicons";

export default function SearchInput() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      doSearch();
      console.log("do validate");
    }
  };

  const doSearch = () => {
//search...
//values are in jobTitle and location and category
    console.log("Search:", jobTitle, location, category);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex bg-blue-50	flex-row gap-2 w-5/6 rounded-lg border-blue-300 border p-4">
        <Input
          variant="outlined"
          label="Job Title"
          type="search"
          className="bg-white"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
        <Input
          variant="outlined"
          label="Location"
          type="search"
          className="bg-white"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Input
          onKeyDown={handleKeyDown}
          variant="outlined"
          label="Category"
          type="search"
          className="bg-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <IconButton onClick={doSearch} className="w-24 h-24 flex-none">
          <Unicons.UilSearch />
        </IconButton>
      </div>
    </div>
  );
}
