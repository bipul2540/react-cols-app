import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Header } from "../General Components/Header";

const AuthMain = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthMain;
