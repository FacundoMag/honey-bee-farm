// ApiarioList.jsx
import React from 'react';

const ApiarioList = ({ apiarios, setEditApiario, deleteApiario }) => {
  return (
    <ul className="apiario-list">
      {apiarios.map(apiario => (
        <li key={apiario.id} className="apiario-item">
          <span>{apiario.nombre} - {apiario.ubicacion}</span>
          <div>
            <button onClick={() => setEditApiario(apiario)}>Editar</button>
            <button onClick={() => deleteApiario(apiario.id)}>Eliminar</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ApiarioList;
