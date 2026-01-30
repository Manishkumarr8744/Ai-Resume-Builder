import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Compoents/Navbar";
import { useSelector } from "react-redux";
import Loader from "../Compoents/Loader";
import Login from "./Login";

const Layout = () => {
  const { loading, user } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {user ? (
        <>
          <div className="min-h-screen bg-red-50">
            <Navbar />
            <Outlet />
          </div>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Layout;
