import React, { Component } from 'react';
import axios from 'axios';

class Apiarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiarios: [], // Estado para almacenar los datos obtenidos
      nombreApiario: '', // Para el formulario
      idArea: '', // Para el formulario
      editingApiarioId: null, // ID del apiario que se está editando
    };
  }

  componentDidMount() {
    this.obtenerApiarios();
  }

  obtenerApiarios = () => {
    axios.get('http://localhost:8080/api/apiarios')
      .then(response => {
        this.setState({ apiarios: response.data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  manejarCambioFormulario = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  manejarEnvioFormulario = (e) => {
    e.preventDefault();

    const { nombreApiario, idArea, editingApiarioId } = this.state;

    if (editingApiarioId) {
      // Si estamos editando, hacer PUT
      axios.put(`http://localhost:8080/api/apiarios/${editingApiarioId}`, {
        nombreApiario,
        IDArea: idArea,
      })
      .then(response => {
        this.obtenerApiarios(); // Actualiza la lista después de editar
        this.setState({
          nombreApiario: '',
          idArea: '',
          editingApiarioId: null, // Limpiar el modo de edición
        });
        alert('Apiario actualizado con éxito');
      })
      .catch(error => {
        console.error('Error al actualizar apiario:', error);
        alert('Hubo un error al actualizar el apiario');
      });
    } else {
      // Si no estamos editando, hacer POST para crear
      axios.post('http://localhost:8080/api/apiarios', {
        nombreApiario,
        IDArea: idArea,
      })
      .then(response => {
        this.obtenerApiarios(); // Actualiza la lista después de crear
        this.setState({
          nombreApiario: '',
          idArea: '',
        });
        alert('Apiario creado con éxito');
      })
      .catch(error => {
        console.error('Error al crear apiario:', error);
        alert('Hubo un error al crear el apiario');
      });
    }
  };

  manejarEdicion = (apiario) => {
    this.setState({
      nombreApiario: apiario.NombreApiario,
      idArea: apiario.IDArea,
      editingApiarioId: apiario.IDApiario, // Seteamos el ID para el PUT
    });
  };

  render() {
    const { apiarios, nombreApiario, idArea } = this.state;

    return (
      <div>
        <h3>Lista de Apiarios</h3>
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre Apiario</th>
              <th>Área</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {apiarios.map(apiario => (
              <tr key={apiario.IDApiario}>
                <td>{apiario.IDApiario}</td>
                <td>{apiario.NombreApiario}</td>
                <td>{apiario.NombreArea}</td>
                <td>
                  <button onClick={() => this.manejarEdicion(apiario)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>{this.state.editingApiarioId ? 'Editar Apiario' : 'Crear Nuevo Apiario'}</h3>
        <form onSubmit={this.manejarEnvioFormulario}>
          <div>
            <label>Nombre Apiario: </label>
            <input
              type="text"
              name="nombreApiario"
              value={nombreApiario}
              onChange={this.manejarCambioFormulario}
              required
            />
          </div>
          <div>
            <label>Área: </label>
            <select
              name="idArea"
              value={idArea}
              onChange={this.manejarCambioFormulario}
              required
            >
              <option value="">Seleccionar área</option>
              <option value="1">Zona Norte</option>
              <option value="2">Zona Sur</option>
              <option value="3">Zona Este</option>
              <option value="4">Zona Oeste</option>
              <option value="5">Zona Centro</option>
            </select>
          </div>
          <button type="submit">
            {this.state.editingApiarioId ? 'Actualizar Apiario' : 'Crear Apiario'}
          </button>
        </form>
      </div>
    );
  }
}

export default Apiarios;
