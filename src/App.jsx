import { useState } from "react";

import Auth from "./pages/auth/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/post/Dashboard";
import Register from "./pages/auth/Register";
import Profile from "./pages/profilePage/Profile";
import { useSelector } from "react-redux";
import AllCommunicatiesPage from "./pages/communities/AllCommunicatiesPage";
import AllUsersPage from "./pages/users/AllUsersPage";

function App() {
  const login = useSelector((state) => state.auth.login);
  console.log("login", login);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/profile" element={<Profile />}></Route>

        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/communities" element={<AllCommunicatiesPage />}></Route>
        <Route path="/all-people" element={<AllUsersPage />}></Route>
        <Route path="*" element={<Auth />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
