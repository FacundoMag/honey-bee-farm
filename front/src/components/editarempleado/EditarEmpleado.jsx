import React, { Component } from "react";
import { useRoute } from "wouter";
import axios from "axios";

class EditarEmpleado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      UID: "",
      pasaporte: "",
      NombreUsuario: "",
      telefono: "",
      correo: "",
      estado: 1,
      isLoading: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchEmployeeData = this.fetchEmployeeData.bind(this);
  }

  componentDidMount() {
    const { params } = this.props;
    const { UID } = params;
    this.fetchEmployeeData(UID);
  }

  fetchEmployeeData(UID) {
    axios
      .get(`http://localhost:5000/api/empleados/${UID}`)
      .then((response) => {
        const employee = response.data;
        this.setState({ ...employee, isLoading: false });
      })
      .catch((error) => {
        console.error("Error al obtener los datos del empleado:", error);
        alert("No se pudieron cargar los datos del empleado.");
        this.setState({ isLoading: false });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { UID, pasaporte, NombreUsuario, telefono, correo, estado } = this.state;

    axios
      .put(`http://localhost:5000/api/empleados/${UID}`, {
        pasaporte,
        NombreUsuario,
        telefono,
        correo,
        estado,
      })
      .then(() => {
        alert("Empleado actualizado correctamente.");
        window.location.href = "/gestion-empleados";
      })
      .catch((error) => {
        console.error("Error al actualizar el empleado:", error);
        alert("No se pudo actualizar el empleado.");
      });
  }

  render() {
    const { pasaporte, NombreUsuario, telefono, correo, estado, isLoading } = this.state;

    if (isLoading) return <div>Cargando datos del empleado...</div>;

    return (
      <div className="editar-empleado-container">
        <h1>Editar Empleado</h1>
        <form onSubmit={this.handleSubmit} className="editar-empleado-form">
          <div className="form-group">
            <label htmlFor="pasaporte">Pasaporte:</label>
            <input
              type="text"
              id="pasaporte"
              name="pasaporte"
              value={pasaporte}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="NombreUsuario">Nombre Completo:</label>
            <input
              type="text"
              id="NombreUsuario"
              name="NombreUsuario"
              value={NombreUsuario}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              value={telefono}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico:</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={correo}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="estado">Estado:</label>
            <select
              id="estado"
              name="estado"
              value={estado}
              onChange={this.handleChange}
              required
            >
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>
          </div>

          <button type="submit" className="btn-submit">Guardar Cambios</button>
        </form>
      </div>
    );
  }
}

export default (props) => {
  const [match, params] = useRoute("/editar-empleado/:UID");
  return <EditarEmpleado {...props} params={params} />;
};