import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'wouter';
import Header from './components/comun/header/Header';
import Footer from './components/comun/footer/Footer';
import InicioSesion from './components/login/Login';
import VisualizacionDeTareas from './components/visualizacionDeTareas/visualizacionDeTareas';
import EstadisticasMiel from './components/estadisticas/EstadisticasMiel';
import Register from './components/register/Register';
import './App.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false
        };
    }

    componentDidMount() {
        const token = sessionStorage.getItem("token");
        if (token) {
            this.setState({ isAuthenticated: true });
        }
    }

    handleLogin = (token) => {
        sessionStorage.setItem("token", token);
        this.setState({ isAuthenticated: true });
    };

    handleLogout = () => {
        sessionStorage.removeItem("token");
        this.setState({ isAuthenticated: false });
    };

    render() {
        const { isAuthenticated } = this.state;

        return (
            <Router>
                <Header isAuthenticated={isAuthenticated} onLogout={this.handleLogout} />
                <main>
                    <Switch>
                        <Route path="/iniciar-sesion">
                            {isAuthenticated ? <Redirect to="/tareas" /> : <InicioSesion onLogin={this.handleLogin} />}
                        </Route>
                        <Route path="/registrarse">
                            {isAuthenticated ? <Redirect to="/tareas" /> : <Register />}
                        </Route>
                        <Route path="/tareas">
                            {isAuthenticated ? <VisualizacionDeTareas /> : <Redirect to="/iniciar-sesion" />}
                        </Route>
                        <Route path="/ver-tarea/:id_tarea">
                            {isAuthenticated ? <VisualizacionDeTareas /> : <Redirect to="/iniciar-sesion" />} {/* Usar el mismo componente */}
                        </Route>
                        <Route path="/estadisticas-miel">
                            {isAuthenticated ? <EstadisticasMiel /> : <Redirect to="/iniciar-sesion" />}
                        </Route>
                        <Route>
                            <Redirect to="/iniciar-sesion" />
                        </Route>
                    </Switch>
                </main>
                <Footer />
            </Router>
        );
    }
}
