import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import { db } from "../firebase"; // tu configuración en firebase.js
import { collection, addDoc } from "firebase/firestore";

function UserForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [validator] = useState(new SimpleReactValidator());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      try {
        // Guardar en Firestore con SDK v9
        await addDoc(collection(db, "users"), {
          name: form.name,
          email: form.email,
        });
        alert("Usuario guardado en Firestore");
        setForm({ name: "", email: "" });
        validator.hideMessages();
      } catch (error) {
        alert("Error al guardar: " + error.message);
      }
    } else {
      validator.showMessages();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <div className="mb-3">
        <label className="form-label">Nombre:</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={form.name}
          onChange={handleChange}
        />
        {validator.message("name", form.name, "required|alpha")}
      </div>

      <div className="mb-3">
        <label className="form-label">Email:</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={form.email}
          onChange={handleChange}
        />
        {validator.message("email", form.email, "required|email")}
      </div>

      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
    </form>
  );
}

export default UserForm;
