import React, { Component } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from "axios";
import './EstadisticasMiel.css';

Chart.register(ArcElement, Tooltip, Legend);

class EstadisticasMiel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      estadisticas: [],
    };
  }

  componentDidMount() {
    this.fetchEstadisticasMiel();
  }

  fetchEstadisticasMiel = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/estadisticas/miel');
      this.setState({ estadisticas: response.data });
    } catch (error) {
      console.error("Error al obtener las estadísticas de miel:", error);
    }
  };

  render() {
    const { estadisticas } = this.state;

    const data = {
      labels: estadisticas.map(stat => `Mes ${stat.mes}`),
      datasets: [{
        data: estadisticas.map(stat => stat.kilos_extraidos),
        backgroundColor: ["#F2BC41", "#E4901C", "#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#A3753A", "#D0AB7D", "#FF6384", "#36A2EB"],
      }]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      }
    };

    return (
      <div className="EstadisticasMiel">
        <h2>Estadísticas de Miel Recolectada</h2>
        {estadisticas.length > 0 ? (
          <Doughnut data={data} options={options} />
        ) : (
          <p>Cargando datos...</p>
        )}
      </div>
    );
  }
}

export default EstadisticasMiel;
