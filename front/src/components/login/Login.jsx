import React, { Component } from 'react';
import axios from '../AxiosConfig';
import withNavigate from '../withNavigate';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // Borrar el token cuando el componente se monta
    localStorage.removeItem('token');
    this.props.onAuthenticate(false); // Actualizar el estado de autenticación a falso
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    axios.post('/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token); // Almacenar el token en Local Storage
        alert('Login exitoso');
        this.props.onAuthenticate(true); // Llamar al método de autenticación
        this.props.navigate('/dashboard'); // Redirigir a la página principal
      })
      .catch(error => {
        console.error('Error durante el inicio de sesión:', error);
        alert('Error durante el inicio de sesión');
      });
  }

  render() {
    return (
      <div className="login-form-container">
        <div className="login-form">
          <h3>INICIAR SESIÓN</h3>
          <form onSubmit={this.handleSubmit}>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Contraseña"
              required
            />
            <br />
            ¿No tiene una cuenta? <a href='/register' style={{color: 'orange', textDecoration: "underline", marginLeft: "5px"}}>Regístrate</a>
            <button type="submit" className="login-button">
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withNavigate(Login);
