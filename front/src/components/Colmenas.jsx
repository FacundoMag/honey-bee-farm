import React, { Component } from 'react';
import axios from 'axios';

class Colmenas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colmenas: []
    };
  }

  componentDidMount() {
    const { apiarioId } = this.props;
    if (apiarioId) {
      axios.get(`/api/colmenas?apiarioId=${apiarioId}`)
        .then(response => {
          this.setState({ colmenas: response.data });
        })
        .catch(error => {
          console.error('Error fetching colmenas:', error);
        });
    }
  }

  render() {
    const { colmenas } = this.state;

    return (
      <div>
        <h1>Colmenas</h1>
        <ul>
          {colmenas.map(colmena => (
            <li key={colmena.IDColmena}>{colmena.Camaras} cámaras, {colmena.TipoTapa} tapa</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Colmenas;
