// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import HomePage from "../pages/Home";
// import SignUp from "../pages/SignUp";
// import Login from "../pages/Login";
// import DashboardSeeker from "../pages/DashboardSeeker";

// export default function AllRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* <Route path="/" element={<HomePage />} /> */}
//         {/* <Route path="/" element={<SignUp />} /> */}
//         {/* <Route path="/" element={<Login />} /> */}
//         {/* <Route path="/" element={<DashboardSeeker />} /> */}
//         {/* <Route path="*" element={<NotFound />} /> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import DashboardSeeker from "../pages/DashboardSeeker";
import history from './history';

export default function AllRoutes() {
  return (
    <Router history={history}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboardseeker" element={<DashboardSeeker />} />
      </Routes>
    </Router>
  );
}
