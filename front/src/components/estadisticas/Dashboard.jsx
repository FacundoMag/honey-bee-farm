import React, { Component } from "react";
import EstadisticasMiel from "./EstadisticasMiel";
import EstadisticasTareas from "./EstadisticasTareas";
import './Dashboard.css';
import './EstadisticasMiel.css'; // Importa los estilos para EstadisticasMiel
import './Estadisticas.css'; // Importa los estilos generales

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStats: "tareas"
    };
  }

  render() {
    const { selectedStats } = this.state;

    return (
      <div className="Dashboard">
        <div className="statistics">
          <h2>Selecciona las Estadísticas a Ver</h2>
          <select onChange={(e) => this.setState({ selectedStats: e.target.value })}>
            <option value="tareas">Estadísticas de Tareas</option>
            <option value="miel">Estadísticas de Miel</option>
          </select>
          {selectedStats === "tareas" ? (
            <EstadisticasTareas />
          ) : (
            <EstadisticasMiel token={sessionStorage.getItem("token")} />
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
