import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Registros = () => {
  const [registros, setRegistros] = useState([]); // Estado para almacenar los registros
  const [error, setError] = useState(null); // Estado para manejar errores
  const API_URL = "http://localhost:8080/registros"; // URL de tu API

  // Función para obtener registros desde la API
  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Error al cargar los registros");
        }
        const data = await response.json();
        setRegistros(data.results); // Asignar los registros al estado
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRegistros(); // Llamar a la función al cargar el componente
  }, []);

  return (
    <div className="min-vh-100 bg-white">
      {/* Header */}
      <div className="bg-warning py-3">
        <h1 className="text-white text-center fw-bold">GREIDANUS HONEYBEE</h1>
      </div>

      {/* Card */}
      <div className="container py-5">
        <div className="card shadow">
          <div className="card-header bg-warning bg-opacity-25">
            <h4 className="text-warning">Registros</h4>
            <p className="text-warning text-opacity-75">
              Gestión y seguimiento de registros de actividades
            </p>
          </div>
          <div className="card-body p-0">
            {/* Mostrar mensaje de error si ocurre */}
            {error ? (
              <div className="alert alert-danger m-3" role="alert">
                {error}
              </div>
            ) : (
              <table className="table table-hover mb-0">
                <thead className="bg-warning bg-opacity-25">
                  <tr>
                    <th className="text-warning fw-semibold">Estado</th>
                    <th className="text-warning fw-semibold">Descripción</th>
                    <th className="text-warning fw-semibold text-end">
                      Fecha Creado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapear registros obtenidos */}
                  {registros.map((registro, index) => (
                    <tr key={index} className="align-middle">
                      <td>
                        <span
                          className={`badge ${
                            registro.terminado === 1
                              ? "bg-success text-light"
                              : "bg-secondary text-light"
                          }`}
                        >
                          {registro.terminado === 1 ? "Completado" : "Pendiente"}
                        </span>
                      </td>
                      <td className="fw-medium">{registro.descripcion}</td>
                      <td className="text-end text-secondary">
                        {new Date(registro.fechaCreado).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-warning bg-opacity-10 py-3 text-center">
        <p className="text-warning text-opacity-75 m-0">
          All rights reserved GREIDANUS HONEYBEE®
        </p>
      </div>
    </div>
  );
};

export default Registros;
