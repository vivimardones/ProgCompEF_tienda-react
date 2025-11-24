// src/components/UserForm.js
import React, { useState } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function UserForm() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(""); // 👈 para mostrar la imagen subida

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let fileURL = "";

      if (file) {
        const storageRef = ref(storage, "uploads/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Progreso: " + progress + "%");
            },
            (error) => console.error("Error al subir:", error),
            async () => {
              fileURL = await getDownloadURL(uploadTask.snapshot.ref);
              setPreviewURL(fileURL); // 👈 mostrar imagen subida
              resolve();
            }
          );
        });
      }

      // Guardar datos en Firestore
      await addDoc(collection(db, "users"), {
        name: form.name,
        email: form.email,
        fileURL: fileURL, // 👈 guardamos la URL del archivo
      });

      alert("Datos guardados con éxito");
      setForm({ name: "", email: "" });
      setFile(null);
    } catch (error) {
      alert("Error al guardar: " + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Formulario con Storage</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Archivo:</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </form>

      {/* Mostrar imagen subida */}
      {previewURL && (
        <div className="mt-4">
          <h5>Archivo subido:</h5>
          <img src={previewURL} alt="Archivo subido" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
}

export default UserForm;