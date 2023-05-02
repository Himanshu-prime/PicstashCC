
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import {  Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddEdit from './pages/AddEdit'
import SingleImage from "./pages/SingleImage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"))
  useEffect(() => {
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
       <Navbar/>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/posts/:_id" element={<PrivateRoute><SingleImage /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/editImage" element={<PrivateRoute><AddEdit /></PrivateRoute>} />
        <Route path="/editImage/:postId" element={<PrivateRoute><AddEdit /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />

      </Routes>
   

      
  
    </div>
  );
}

export default App;
