import React, { Component } from "react";
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
    this.editUser = this.editUser.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    axios
      .get("http://localhost:5000/api/empleados")
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        this.setState({ users: response.data.results || [] });
      })
      .catch((error) => {
        console.error("Error al obtener empleados:", error);
        alert("No se pudo obtener la lista de empleados.");
      });
  }

  toggleUserState(userId) {
    axios
      .put(`http://localhost:5000/api/deshabilitacion?ID=${userId}`)
      .then((response) => {
        console.log("Estado actualizado:", response.data);
        this.fetchUsers(); // Volvemos a obtener la lista después de actualizar el estado
      })
      .catch((error) => {
        console.error("Error al actualizar el estado del usuario:", error);
        alert("No se pudo actualizar el estado del empleado.");
      });
  }

  editUser(userId) {
    // Lógica para redirigir al formulario de edición del usuario
    console.log("Editar usuario con ID:", userId);
    // Aquí puedes redirigir, por ejemplo:
    window.location.href = `/editar-empleado/${userId}`;
  }

  handleSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    const { users, searchTerm } = this.state;

    // Filtraria usuarios por NombreUsuario o pasaporte
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
          <button className="search-button">Buscar</button>
        </div>
        <table className="employees-table">
          <thead>
            <tr>
              <th>Pasaporte</th>
              <th>Nombre Completo</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Contraseña</th>
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
                    {user.Password && user.Password.length > 0
                      ? "*".repeat(user.Password.length)
                      : "No disponible"}
                  </td>
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
                    <i
                      className="bi bi-pencil-square edit-icon"
                      title="Editar"
                      onClick={() => this.editUser(user.UID)}
                    ></i>
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
                <td colSpan="7">No hay empleados registrados</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default GestionEmpleados;
