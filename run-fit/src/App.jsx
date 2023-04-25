import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import Events from "./pages/Events";
import Calendars from "./pages/Calendars";
import Footer from "./components/Footer";

import "./App.css";
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Router>
                <Navbar />
                <div className="container mx-auto">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/calendar" element={<Calendars />} />
                        <Route path="/events" element={<Events />} />
                    </Routes>
                </div>
            </Router>
            <Footer />
        </>
    );
}

export default App;
