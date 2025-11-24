// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import UserForm from "./components/UserForm";
import ProductList from "./components/ProductList";

function Layout() {
  const location = useLocation();

  return (
    <>
      {/* Mostrar Navbar en todas las páginas excepto en login (ruta "/") */}
      {location.pathname !== "/" && <Navbar />}

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/formulario" element={<UserForm />} />
          <Route path="/productos" element={<ProductList />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;