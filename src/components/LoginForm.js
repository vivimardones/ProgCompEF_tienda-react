import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Detectar si ya está logeado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Registrar usuario
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Usuario registrado con éxito");
      navigate("/formulario"); // o "/productos"
    } catch (error) {
      alert("Error al registrar: " + error.message);
    }
  };

  // Iniciar sesión
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login exitoso");
      navigate("/formulario"); // o "/productos"
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };

  // Cerrar sesión
  const logoutUser = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>Autenticación</h2>

      {!user ? (
        <form>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-success me-2" onClick={registerUser}>
            Registrar
          </button>
          <button className="btn btn-primary" onClick={loginUser}>
            Login
          </button>
        </form>
      ) : (
        <div>
          <p>Bienvenido, {user.email}</p>
          <button className="btn btn-danger" onClick={logoutUser}>
            Cerrar sesión
          </button>

          {/* Menú de navegación */}
          <nav className="mt-3">
            <Link to="/formulario" className="btn btn-outline-primary me-2">
              Formulario
            </Link>
            <Link to="/productos" className="btn btn-outline-secondary">
              Lista de Productos
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}

export default LoginForm;