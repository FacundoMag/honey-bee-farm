import React, { Component } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from "axios";
import './EstadisticasMiel.css';

Chart.register(ArcElement, Tooltip, Legend);

class EstadisticasTareas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estadisticas: [],
    };
  }

  componentDidMount() {
    this.fetchEstadisticasTrabajos();
  }

  fetchEstadisticasTrabajos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/estadisticas/trabajos');
      this.setState({ estadisticas: response.data });
    } catch (error) {
      console.error("Error al obtener las estadísticas de trabajos:", error);
    }
  };

  render() {
    const { estadisticas } = this.state;

    const data = {
      labels: estadisticas.map(stat => `Mes ${stat.mes}`),
      datasets: [{
        data: estadisticas.map(stat => stat.trabajos_exitosos + stat.trabajos_no_exitosos),
        backgroundColor: ["#F2BC41", "#E4901C"],
        hoverBackgroundColor: ["#A3753A", "#D0AB7D"],
      }]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.formattedValue;
              return `${label}: ${value} trabajo${value > 1 ? 's' : ''}`;
            }
          }
        }
      }
    };

    return (
      <div className="EstadisticasTareas">
        <h2>Estadísticas de Tareas</h2>
        {estadisticas.length > 0 ? (
          <Doughnut data={data} options={options} />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    );
  }
}

export default EstadisticasTareas;
