import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import Login from "./components/Login";
import Register from "./components/Register";


function App() {
    return (
        <Router>
            <nav>
                <marquee behavior="left" direction="left"><h1>Wings Inventory Management System</h1>
                </marquee>                
                <Link to="/dashboard">Dashboard</Link> |{" "}
                <Link to="/register">Register</Link> |{" "}
                <Link to="/login">Login</Link> |{" "}
                <Link to="/products">Product List</Link> |{" "}
                
               
            </nav>
            <Routes>

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
