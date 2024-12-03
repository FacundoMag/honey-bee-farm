import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Registros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registros: [], // Estado para almacenar los registros
      error: null, // Estado para manejar errores
    };
    this.API_URL = "http://localhost:5000/api/registro"; // URL de tu API
  }

  // Función para obtener registros desde la API
  componentDidMount() {
    this.fetchRegistros();
  }

  fetchRegistros() {
    fetch(this.API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los registros");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos obtenidos:", data); // Verifica los datos aquí
        // Asegúrate de que `data.results` contiene los registros esperados
        this.setState({ registros: data.results || [] }); // Asignar los registros al estado
      })
      .catch((err) => {
        console.error("Error:", err);
        this.setState({ error: err.message });
      });
  }

  render() {
    const { registros, error } = this.state;

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
                    {registros.length > 0 ? (
                      registros.map((registro, index) => (
                        <tr key={index} className="align-middle">
                          <td>
                            <span
                              className={`badge ${
                                registro.terminado === 1
                                  ? "bg-success text-light"
                                  : "bg-secondary text-light"
                              }`}
                            >
                              {registro.terminado === 1
                                ? "Completado"
                                : "Pendiente"}
                            </span>
                          </td>
                          <td className="fw-medium">{registro.Descripcion}</td>
                          <td className="text-end text-secondary">
                            {new Date(registro.FechaCreado).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                              }
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">
                          No hay registros disponibles.
                        </td>
                      </tr>
                    )}
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
  }
}

export default Registros;
