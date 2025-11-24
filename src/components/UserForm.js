import React, { useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { db } from '../firebase'; // Se Configura en la actividad 3

function UserForm() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [validator] = useState(new SimpleReactValidator());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.allValid()) {
      // Guardar en Firestore
      db.collection('users')
        .add(form)
        .then(() => {
          alert('Usuario guardado en Firestore');
          setForm({ name: '', email: '' });
          validator.hideMessages();
        })
        .catch((error) => {
          alert('Error al guardar: ' + error.message);
        });
    } else {
      validator.showMessages();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        {validator.message('name', form.name, 'required|alpha')}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        {validator.message('email', form.email, 'required|email')}
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
}

export default UserForm;