import React, { Component } from 'react';
import { Link, Redirect } from 'wouter';
import axios from 'axios';
import Notificacion from '../comun/Notificacion';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordVisible: false,
      nombreUsuario: '',
      password: '',
      error: '',
      isAuthenticated: false,
    };
  }

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      passwordVisible: !prevState.passwordVisible,
    }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { nombreUsuario, password } = this.state;

    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        {
          nombreUsuario: nombreUsuario,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;

      if (data.message === 'acceso concedido') {
        localStorage.setItem('token', data.token);

        this.props.onLogin(data.usuario_id, data.token);

        this.setState({ isAuthenticated: true, error: null });
        Notificacion.show('Inicio de Sesión exitosa', 'success');
      } else {
        Notificacion.show('Nombre de usuario o contraseña incorrecto, verifique los datos e inténtelo nuevamente', 'error');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || 'Error de conexión con el servidor';
      this.setState({ error: errorMessage });
      console.error('Error en el inicio de sesión:', error);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { nombreUsuario, password, passwordVisible, error, isAuthenticated } = this.state;

    if (isAuthenticated) {
      return <Redirect to="/tareas" />;
    }

    return (
      <div className="login-page">
        <div className="login-container">
          <Link to="/" className="back-icon" title="Go Back">
            <i className="bi bi-arrow-left"></i>
          </Link>

          <h2 className="login-title">Iniciar Sesión</h2>

          {error && <p className="error-text">{error}</p>}

          <form className="login-form" onSubmit={this.handleSubmit}>
            <InputField
              type="text"
              id="nombreUsuario"
              label="Usuario"
              placeholder="Ingresa tu nombre de usuario"
              iconClass="bi bi-person"
              value={nombreUsuario}
              onChange={this.handleChange}
            />

            <InputField
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              iconClass="bi bi-lock"
              toggleIconClass={passwordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'}
              onToggle={this.togglePasswordVisibility}
              value={password}
              onChange={this.handleChange}
            />

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p className="register-link">
            ¿No tienes una cuenta? <Link href="/registrarse">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    );
  }
}

class InputField extends Component {
  render() {
    const { type, id, label, placeholder, iconClass, toggleIconClass, onToggle, value, onChange } = this.props;

    return (
      <div className="input-group">
        <label htmlFor={id} className="input-label">
          {label}
        </label>
        <div className="input-wrapper">
          <i className={`${iconClass} icon`}></i>
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            className="input-field"
            value={value}
            onChange={onChange}
          />
          {toggleIconClass && (
            <i
              className={`${toggleIconClass} toggle-icon`}
              onClick={onToggle}
            ></i>
          )}
        </div>
      </div>
    );
  }
}

export default Login;
