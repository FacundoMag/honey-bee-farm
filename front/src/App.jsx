import React, { Component } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/estadisticas/Dashboard';
import Trabajos from './components/trabajos/Trabajos';
import Header from './components/comun/header/Header';
import Footer from './components/comun/footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: !!localStorage.getItem('token'), // Estado de autenticación basado en la presencia del token
    };
  }

  // Método para actualizar el estado de autenticación
  handleAuthentication = (isAuthenticated) => {
    this.setState({ isAuthenticated });
  };

  componentDidUpdate(prevProps, prevState) {
    // Verificar si el estado de autenticación ha cambiado
    if (prevState.isAuthenticated !== this.state.isAuthenticated) {
      // Actualizar isAuthenticated basado en la existencia del token
      const token = localStorage.getItem('token');
      this.setState({ isAuthenticated: !!token });
    }
  }

  render() {
    const { isAuthenticated } = this.state;
    return (
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route
              path="/login"
              element={<Login onAuthenticate={this.handleAuthentication} />}
            />
            <Route
              path="/register"
              element={<Register />}
            />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/trabajos"
              element={
                isAuthenticated ? (
                  <Trabajos />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
