import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import App from "../App";
import { useUser } from "./useUser";

export const PrivateRoutes = ({ children, ...rest }) => {
  const user = useUser();

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) return navigate("/signin");
  }, [user]);

  //   else part
  return <Outlet />;
};
