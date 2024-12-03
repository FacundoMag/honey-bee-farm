import React, { Component } from "react";
import axios from "axios";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import './EstadisticasMiel.css'; 
import './Estadisticas.css'; 

Chart.register(ArcElement, Tooltip, Legend);

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStats: "tareas",
      mielStats: [],
      trabajosStats: []
    };
  }

  componentDidMount() {
    this.fetchMielStats();
    this.fetchTrabajosStats();
  }

  fetchMielStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/estadisticas/miel');
      this.setState({ mielStats: response.data });
    } catch (error) {
      console.error("Error al obtener las estadísticas de miel:", error);
    }
  };
  
  fetchTrabajosStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/estadisticas/trabajos');
      console.log(response);
      this.setState({ trabajosStats: response.data });
    } catch (error) {
      console.error("Error al obtener las estadísticas de trabajos:", error);
    }
  };

  render() {
    const { selectedStats, mielStats, trabajosStats } = this.state;

    const mielData = {
      labels: mielStats.map(stat => `Mes ${stat.Mes}`),
      datasets: [{
        data: mielStats.map(stat => stat.kilos_extraidos),
        backgroundColor: ["#F2BC41", "#E4901C", "#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#A3753A", "#D0AB7D", "#FF6384", "#36A2EB"],
      }]
    };

    const trabajosData = {
      labels: trabajosStats.map(stat => `Mes ${stat.Mes}`),
      datasets: [{
        data: trabajosStats.map(stat => stat.trabajos_exitosos + stat.trabajos_no_exitosos),
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
      }
    };

    return (
      <div className="Dashboard">
        <div className="statistics">
          <h2>Selecciona las Estadísticas a Ver</h2>
          <select onChange={(e) => this.setState({ selectedStats: e.target.value })}>
            <option value="tareas">Estadísticas de Tareas</option>
            <option value="miel">Estadísticas de Miel</option>
          </select>
          {selectedStats === "tareas" ? (
            trabajosStats.length > 0 ? (
              <Doughnut data={trabajosData} options={options} className="statistics-chart" />
            ) : (
              <p>Cargando datos de trabajos...</p>
            )
          ) : (
            mielStats.length > 0 ? (
              <Doughnut data={mielData} options={options} className="statistics-chart" />
            ) : (
              <p>Cargando datos de miel...</p>
            )
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
