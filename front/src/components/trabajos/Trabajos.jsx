import React, { Component } from 'react';
import axios from '../AxiosConfig'; 
import './Trabajos.css'; 

export default class Trabajos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiarios: [],
      areas: [],
      tareas: [],
      nombreTarea: '',
      idApiario: '',
      idArea: '',
      error: '',
    };

    // Enlazar los métodos
    this.getApiarios = this.getApiarios.bind(this);
    this.getAreas = this.getAreas.bind(this);
    this.getTareas = this.getTareas.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getApiarios();
    this.getAreas(); // Obtener las áreas
    this.getTareas();
  }

  // Obtener todos los apiarios
  getApiarios = async () => {
    try {
      const response = await axios.get('/apiarios');
      this.setState({ apiarios: response.data });
    } catch (error) {
      console.error('Error obteniendo los apiarios:', error);
      this.setState({ error: 'Error obteniendo los apiarios' });
    }
  };

  // Obtener todas las áreas
  getAreas = async () => {
    try {
      const response = await axios.get('/areas'); // Endpoint para obtener áreas
      this.setState({ areas: response.data });
    } catch (error) {
      console.error('Error obteniendo las áreas:', error);
      this.setState({ error: 'Error obteniendo las áreas' });
    }
  };

  // Obtener todas las tareas
  getTareas = async () => {
    try {
      const response = await axios.get('/trabajos', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      this.setState({ tareas: response.data });
    } catch (error) {
      console.error('Error obteniendo las tareas:', error);
      this.setState({ error: 'Error obteniendo las tareas' });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { nombreTarea, idApiario, idArea } = this.state;

    try {
      const response = await axios.post('/trabajos', { NombreTarea: nombreTarea, IDApiario: idApiario, IDArea: idArea }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log('Tarea registrada', response.data);
      this.setState({ nombreTarea: '', idApiario: '', idArea: '' });
      this.getTareas(); 
    } catch (error) {
      console.error('Error registrando la tarea', error);
      this.setState({ error: 'Error registrando la tarea' });
    }
  };

  render() {
    const { apiarios, areas, tareas, nombreTarea, idApiario, idArea, error } = this.state;

    return (
      <div className="trabajos-container">
        <h2>Registrar Trabajo</h2>
        <form onSubmit={this.handleSubmit} className="trabajo-form">
          <input
            type="text"
            name="nombreTarea"
            value={nombreTarea}
            onChange={this.handleChange}
            placeholder="Nombre de la tarea"
            required
          />
          <select name="idApiario" value={idApiario} onChange={this.handleChange} required>
            <option value="">Selecciona un apiario</option>
            {apiarios.map((apiario) => (
              <option key={apiario.ID} value={apiario.ID}>
                {apiario.NombreApiario}
              </option>
            ))}
          </select>
          <select name="idArea" value={idArea} onChange={this.handleChange} required> {/* Añadir select para áreas */}
            <option value="">Selecciona un área</option>
            {areas.map((area) => (
              <option key={area.ID} value={area.ID}>
                {area.NombreArea}
              </option>
            ))}
          </select>
          <button type="submit">Registrar Trabajo</button>
          
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        <h3>Tareas Registradas</h3>
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea.ID}>
              {tarea.NombreTarea} - Área: {tarea.IDArea}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
