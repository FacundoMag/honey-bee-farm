import React, { Component } from 'react';
import { Link } from 'wouter';
import Notificacion from '../comun/Notificacion';
import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";

export default class AgregarEmpleado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pasaporte: '',
      nombreYapellido: '',
      telefono: '',
      correo: '',
      password: '',
      confirmPassword: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    // Limitar el campo "pasaporte" a 10 caracteres
    if (name === 'pasaporte' && value.length > 10) {
      return;
    }

    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { pasaporte, nombreYapellido, telefono, correo, password, confirmPassword } = this.state;

    // Validar que todos los campos estén completos
    if (!pasaporte || !nombreYapellido || !telefono || !correo || !password || !confirmPassword) {
      Notificacion.show("Todos los campos son obligatorios, por favor complete el formulario.", "error");
      return;
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      Notificacion.show("Las contraseñas no coinciden, por favor intente nuevamente.", "error");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/registrar', {
        pasaporte,
        nombreYapellido,
        telefono,
        correo,
        password,
      });

      if (res.data.status === 'se creo el empleado correctamente') {
        Notificacion.show("El empleado fue registrado correctamente.", "success");
        this.setState({
          pasaporte: '',
          nombreYapellido: '',
          telefono: '',
          correo: '',
          password: '',
          confirmPassword: '',
        });
      } else {
        Notificacion.show(res.data.error || 'Error al registrar el empleado.', "error");
      }
    } catch (error) {
      Notificacion.show("Error al conectarse con el servidor.", "error");
      console.error(error);
    }
  };

  render() {
    const { pasaporte, nombreYapellido, telefono, correo, password, confirmPassword } = this.state;

    return (
      <div className="register-page">
        <div className="register-container">
          <Link to="/" className="back-icon" title="Go Back">
            <i className="bi bi-arrow-left"></i>
          </Link>

          <h2>Registrar Empleado</h2>

          <form onSubmit={this.handleSubmit}>
            <div className="input-group">
              <label htmlFor="pasaporte">Pasaporte</label>
              <div className="input-wrapper">
                <i className="bi bi-person-vcard-fill"></i>
                <input
                  type="text"
                  id="pasaporte"
                  name="pasaporte"
                  className="input-field"
                  placeholder="Ingrese el pasaporte del empleado"
                  value={pasaporte}
                  onChange={this.handleChange}
                  maxLength={10} // Límite de 10 caracteres
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="nombreYapellido">Nombre y Apellido</label>
              <div className="input-wrapper">
                <i className="bi bi-person-fill"></i>
                <input
                  type="text"
                  id="nombreYapellido"
                  name="nombreYapellido"
                  className="input-field"
                  placeholder="Ingrese el nombre y apellido del empleado"
                  value={nombreYapellido}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="telefono">Teléfono</label>
              <div className="input-wrapper">
                <i className="bi bi-telephone-fill"></i>
                <input
                  type="text"
                  id="telefono"
                  name="telefono"
                  className="input-field"
                  placeholder="Ingrese el número telefónico del empleado"
                  value={telefono}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="correo">Correo electrónico</label>
              <div className="input-wrapper">
                <i className="bi bi-envelope-fill"></i>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  className="input-field"
                  placeholder="Ingrese el correo electrónico del empleado"
                  value={correo}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrapper">
                <i className="bi bi-lock-fill"></i>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input-field"
                  placeholder="Asigne una contraseña"
                  value={password}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <div className="input-wrapper">
                <i className="bi bi-lock-fill"></i>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="input-field"
                  placeholder="Confirma la contraseña asignada"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit">Agregar</button>
          </form>
        </div>
      </div>
    );
  }
}
