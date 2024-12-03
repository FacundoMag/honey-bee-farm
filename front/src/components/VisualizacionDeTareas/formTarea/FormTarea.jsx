import { Component } from "react";
import axios from "axios";
import Notificacion from "../../comun/Notificacion";
import "./FormTarea.css";

export default class FormularioTarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nombreTarea: "",
      caracteresRestantes: 25,
      mes: "", // Para almacenar el mes seleccionado
      año: "", // Para almacenar el año seleccionado
    };
    // Enlaza los métodos para asegurar que `this` funcione correctamente
    this.manejarCambio = this.manejarCambio.bind(this);
    this.manejarSeleccion = this.manejarSeleccion.bind(this);
    this.AgregarTarea = this.AgregarTarea.bind(this);
  }

  manejarCambio(event) {
    const nombreTarea = event.target.value;
    if (nombreTarea.length <= 25) {
      this.setState({
        nombreTarea,
        caracteresRestantes: 25 - nombreTarea.length,
      });
    }
  }

  manejarSeleccion(event) {
    const { id, value } = event.target;
    this.setState({ [id]: value }); // Actualiza mes o año según el id del select
  }

  AgregarTarea() {
    const { nombreTarea, mes, año } = this.state;

    // Validación: asegurarse de que todos los campos estén completos
    if (nombreTarea.length === 0 || mes === "" || año === "") {
      Notificacion.show("Por favor complete todos los campos.", "error");
      return;
    }

    const url = "http://localhost:5000/api/tareas";

    const data = {
      nombreTarea,
      mes,
      año
    };

    axios.post(url, data)
      .then((response) => {
        if (typeof this.props.extraerTareas === 'function') {
          this.props.extraerTareas();
          Notificacion.show("Tarea agregada exitosamente.", "success");
          console.log(response.data);
        } else {
          console.error("extraerTareas no es una función");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { nombreTarea, caracteresRestantes, mes, año } = this.state;

    return (
      <div style={{ display: "flex", justifyContent: "center", width: "108%" }}>
        <div className="TareaInput">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <textarea
              value={nombreTarea}
              onChange={this.manejarCambio}
              placeholder="Introduzca el nombre de la tarea..."
              maxLength="25"
            />

            <select
              id="mes"
              className="SelectFecha"
              value={mes}
              onChange={this.manejarSeleccion}
            >
              <option value="">Mes</option>
              <option value="01">01</option>
              <option value="02">02</option>
              <option value="03">03</option>
              <option value="04">04</option>
              <option value="05">05</option>
              <option value="06">06</option>
              <option value="07">07</option>
              <option value="08">08</option>
              <option value="09">09</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>

            <select
              id="año"
              className="SelectFecha"
              value={año}
              onChange={this.manejarSeleccion}
            >
              <option value="">Año</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="2028">2028</option>
              <option value="2029">2029</option>
              <option value="2030">2030</option>
            </select>
          </div>

          <div className="ControlesNombre">
            <div className="Contador">{caracteresRestantes} caracteres restantes</div>
            <button
              className="AgregarBtn"
              onClick={this.AgregarTarea}
              disabled={nombreTarea.length === 0 || mes === "" || año === ""}
            >
              Agregar tarea
            </button>
          </div>
        </div>
      </div>
    );
  }
}
