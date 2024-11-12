// ApiarioForm.jsx
import React, { useState, useEffect } from 'react';

const ApiarioForm = ({ addApiario, editApiario, updateApiario }) => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (editApiario) {
      setNombre(editApiario.nombre);
      setUbicacion(editApiario.ubicacion);
      setId(editApiario.id);
    } else {
      setNombre('');
      setUbicacion('');
      setId(null);
    }
  }, [editApiario]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoApiario = { id: id || Date.now(), nombre, ubicacion };
    
    if (id) {
      updateApiario(id, nuevoApiario); // Editar apiario existente
    } else {
      addApiario(nuevoApiario); // Crear nuevo apiario
    }
    
    setNombre('');
    setUbicacion('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <input
        type="text"
        placeholder="Nombre del apiario"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Ubicación"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        required
      />
      <button type="submit">{id ? 'Actualizar Apiario' : 'Agregar Apiario'}</button>
    </form>
  );
};

export default ApiarioForm;
