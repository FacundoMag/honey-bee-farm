import React, { Component } from 'react';
import './Estadisticas.css';
import axios from '../AxiosConfig';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

class EstadisticasMiel extends Component {
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

    axios.get('/estadisticas/miel', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      if (Array.isArray(response.data)) {
        const kilosExtraidos = response.data.reduce((acc, item) => acc + item.Kilos, 0);
        const kilosAprox = response.data.reduce((acc, item) => acc + item.KgAprox, 0);
        this.setState({
          data: {
            labels: ['Kg Extraídos', 'Kg Aproximados por extraer'],
            datasets: [{
              data: [kilosExtraidos, kilosAprox],
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
      console.error('Error fetching estadisticas miel:', error);
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <h2>Estadísticas de Miel Extraída</h2>
        {data ? <Doughnut data={data} /> : <p>Cargando...</p>}
      </div>
    );
  }
}

export default EstadisticasMiel;
