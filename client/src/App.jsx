import React from "react";
import  { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Home = lazy(() => import("./Pages/Home"));
const Layout = lazy(() => import("./Pages/Layout"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const ResumeBuilder = lazy(() => import("./Pages/ResumeBuilder"));
const Preview = lazy(() => import("./Pages/Preview"));
const Login = lazy(() => import("./Pages/Login"));



import { useDispatch, useSelector } from "react-redux";
import api from "./Utils/api";
import { login, setLoading } from "./Store/Features/authSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "./Compoents/Loader";

const App = () => {
  const dispatch = useDispatch();
  const {loading}=useSelector(state=>state.auth)

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const { data } = await api.get("/api/users/getUserData", {
          headers: {
        Authorization: `Bearer ${token}`,
      },
        });
        console.log(data);
        
        if (data.User) {
          dispatch(login({ token, User: data.User }));
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (err) {
      dispatch(setLoading(false));
      console.log(err.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

    if (loading) {
    return <><Loader/></>
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeID" element={<ResumeBuilder />} />
        </Route>

        <Route path="view/:resumeId" element={<Preview />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
