import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
// import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
// import { faHatCowboy } from "@fortawesome/pro-thin-svg-icons";
// import { faHatChef } from "@fortawesome/sharp-solid-svg-icons";
// import { faPlateUtensils } from "@fortawesome/sharp-regular-svg-icons";
import { useState, useEffect } from "react";
import "./App.css";
import MyNavbar from "./components/MyNavBar";
import SearchInput from "./components/SearchInput";
import PrimaryJobCard from "./components/PrimaryJobCard";

library.add(
  fas
  // faTwitter,
  // faFontAwesome,
  // faHatCowboy,
  // faHatChef,
  // faPlateUtensils
);

const App = () => {
  const myJob = {
    Title: "Manager",
    Company: "Company 1",
    Field: "Tech",
    Salary: "3000$",
    Location: "Tehran",
  };
  return (
    <>
      <MyNavbar />
      <SearchInput />
      <PrimaryJobCard job={myJob} />
    </>
  );
};

export default App;
