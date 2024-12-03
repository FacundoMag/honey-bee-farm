import React, { Component } from "react";
import axios from "axios";

class EditarEmpleado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pasaporte: props.empleado.pasaporte || "",
      NombreUsuario: props.empleado.NombreUsuario || "",
      telefono: props.empleado.telefono || "",
      correo: props.empleado.correo || "",
      Password: props.empleado.Password || "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { pasaporte, NombreUsuario, telefono, correo, Password } = this.state;
    const { empleado, onEditSuccess } = this.props;

    axios
      .put(`http://localhost:5000/api/empleados/${empleado.UID}`, {
        pasaporte,
        NombreUsuario,
        telefono,
        correo,
        Password,
      })
      .then((response) => {
        console.log("Empleado actualizado:", response.data);
        onEditSuccess(); // Llamamos a la función para actualizar la tabla
        alert("Empleado actualizado correctamente");
      })
      .catch((error) => {
        console.error("Error al actualizar empleado:", error);
        alert("No se pudo actualizar el empleado.");
      });
  }

  render() {
    const { pasaporte, NombreUsuario, telefono, correo, Password } = this.state;

    return (
      <div className="editar-empleado-container">
        <h2>Editar Empleado</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Pasaporte:</label>
            <input
              type="text"
              name="pasaporte"
              value={pasaporte}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Nombre Completo:</label>
            <input
              type="text"
              name="NombreUsuario"
              value={NombreUsuario}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={telefono}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="correo"
              value={correo}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              name="Password"
              value={Password}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit" className="save-button">Guardar</button>
        </form>
      </div>
    );
  }
}

export default EditarEmpleado;
