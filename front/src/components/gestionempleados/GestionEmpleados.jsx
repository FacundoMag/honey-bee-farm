import React, { Component } from "react";
import { Link } from "wouter";
import axios from "axios";
import "./GestionEmpleados.css";

class GestionEmpleados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      searchTerm: "",
    };

    this.fetchUsers = this.fetchUsers.bind(this);
    this.toggleUserState = this.toggleUserState.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    axios
      .get("http://localhost:5000/api/empleados")
      .then((response) => {
        this.setState({ users: response.data.results || [] });
      })
      .catch((error) => {
        console.error("Error al obtener empleados:", error);
        alert("No se pudo obtener la lista de empleados.");
      });
  }

  toggleUserState(userId) {
    axios
      .put(`http://localhost:5000/api/deshabilitacion?UID=${userId}`)
      .then(() => {
        this.fetchUsers();
      })
      .catch((error) => {
        console.error("Error al actualizar el estado del usuario:", error);
        alert("No se pudo actualizar el estado del empleado.");
      });
  }

  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { users, searchTerm } = this.state;
    const filteredUsers = users.filter((user) =>
      user.NombreUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.pasaporte.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="gestion-empleados-container">
        <h1 className="title">Gestión de Empleados</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar por nombre o pasaporte..."
            value={searchTerm}
            onChange={this.handleSearchChange}
            className="search-input"
          />
        </div>
        <table className="employees-table">
          <thead>
            <tr>
              <th>Pasaporte</th>
              <th>Nombre Completo</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.UID}>
                  <td>{user.pasaporte}</td>
                  <td>{user.NombreUsuario}</td>
                  <td>{user.telefono}</td>
                  <td>{user.correo}</td>
                  <td>
                    <span
                      className={`state-badge ${
                        user.estado === 1 ? "state-active" : "state-inactive"
                      }`}
                    >
                      {user.estado === 1 ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    {/* Icono de edición */}
                    <Link href={`/editar-empleado/${user.UID}`}>
                      <i
                        className="bi bi-pencil-square edit-icon"
                        title="Editar"
                      ></i>
                    </Link>
                    {/* Icono de habilitar/deshabilitar */}
                    <i
                      className={`bi ${
                        user.estado === 1
                          ? "bi-toggle-on toggle-icon-active"
                          : "bi-toggle-off toggle-icon-inactive"
                      }`}
                      title={user.estado === 1 ? "Deshabilitar" : "Habilitar"}
                      onClick={() => this.toggleUserState(user.UID)}
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay empleados registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GestionEmpleados;
