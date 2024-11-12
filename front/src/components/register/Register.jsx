import React, { Component } from "react";
import axios from '../AxiosConfig'; 
import Header from "../comun/header/HeaderSimple";
import './Register.css';

export default class CrearCuenta extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password: "",
            error: "",
            success: false,
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = this.state;

        try {
            const response = await axios.post('/register', { username, email, password });
            this.setState({ success: true, error: '' });
            console.log('Registro exitoso', response.data);
        } catch (error) {
            this.setState({
                error: 'Error en el registro. Inténtalo de nuevo.',
                success: false,
            });
            console.error('Error en el registro', error);
        }
    };

    render() {
        const { username, email, password, error, success } = this.state;

        return (
            <>
                <form className="form-container" onSubmit={this.handleSubmit}>
                    <h2 className="form-title">Crear Cuenta</h2>
                    <div className="form-group">
                        <label className="form-label">Nombre de usuario:</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">E-mail:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Contraseña:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>Registro exitoso. ¡Bienvenido!</p>}
                    <button type="submit" className="form-button">Crear cuenta</button>
                    <p className="form-footer">
                        ¿Ya tienes una cuenta? <a href="/login" className="form-link">Iniciar sesión</a>
                    </p>
                </form>
            </>
        );
    }
}
