// src/components/Apiarios.js
import React, { Component } from 'react';
import axios from 'axios';
import Colmenas from '../Colmenas'; // Importar componente Colmenas

class Apiarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiarios: []
    };
  }

  componentDidMount() {
    axios.get('/api/apiarios')
      .then(response => {
        this.setState({ apiarios: response.data });
      })
      .catch(error => {
        console.error('Error fetching apiarios:', error);
      });
  }

  render() {
    const { apiarios } = this.state;

    return (
      <div>
        <h1>Apiarios</h1>
        <ul>
          {apiarios.map(apiario => (
            <li key={apiario.IDApiario}>{apiario.NombreApiario}</li>
          ))}
        </ul>
        {apiarios.length > 0 && <Colmenas apiarioId={apiarios[0].IDApiario} />}
      </div>
    );
  }
}

export default Apiarios;
