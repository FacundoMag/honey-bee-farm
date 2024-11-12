import React, { Component } from 'react';
import EstadisticasMiel from './EstadisticasMiel';
import EstadisticasTrabajos from './EstadisticasTrabajos';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">
        <main>
          <h2>Bienvenido al Sistema de Control de Apiarios</h2>
          <p>Aquí puedes gestionar tus apiarios y colmenas de manera eficiente.</p>
          <EstadisticasMiel />
          <EstadisticasTrabajos />
        </main>
      </div>
    );
  }
}

export default Dashboard;
