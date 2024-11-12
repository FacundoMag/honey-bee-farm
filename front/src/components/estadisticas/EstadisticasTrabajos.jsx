import React, { Component } from 'react';
import axios from '../AxiosConfig';
import './Estadisticas.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

class EstadisticasTrabajos extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login');
      return;
    }

    axios.get('/estadisticas/trabajos', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      if (Array.isArray(response.data)) {
        const trabajosExitosos = response.data.reduce((acc, item) => acc + item.TrabajosExitosos, 0);
        const trabajosNoExitosos = response.data.reduce((acc, item) => acc + item.TrabajosNoExitosos, 0);
        this.setState({
          data: {
            labels: ['Trabajos Exitosos', 'Trabajos No Exitosos'],
            datasets: [{
              data: [trabajosExitosos, trabajosNoExitosos],
              backgroundColor: ['#F2BC41', '#E4901C'],
              hoverBackgroundColor: ['#A3753A', '#D0AB7D'],
            }],
          },
        });
      } else {
        console.error('Error: los datos recibidos no son un array.');
      }
    })
    .catch(error => {
      console.error('Error fetching estadisticas trabajos:', error);
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <h2>Estadísticas de Trabajos</h2>
        {data ? <Doughnut data={data} /> : <p>Cargando...</p>}
      </div>
    );
  }
}

export default EstadisticasTrabajos;
