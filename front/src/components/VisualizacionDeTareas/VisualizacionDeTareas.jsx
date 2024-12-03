import { Component } from "react";
import FormTarea from "./formTarea/FormTarea";
import TareaCard from "./TareaCard/TareaCard";
import Boton from "../comun/Boton";
import "./VisualizacionDeTareas.css";
import axios from "axios";

export default class VisualizacionDeTareas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tareas: []
        };
    }

    componentDidMount() {
        this.extraerTareas();  // Llamada inicial al API para cargar las tareas
    }

    extraerTareas = () => {
        const url = "http://localhost:5000/api/tareas";

        axios.get(url)
            .then((response) => {
                this.setState({ tareas: response.data });
            })
            .catch((error) => {
                console.error("Error al cargar las tareas:", error);
            });
    }

    render() {
        return (
            <div className="Contenedor">
                <FormTarea
                    extraerTareas = {this.extraerTareas}
                />

                {this.state.tareas.length > 0 ? (
                    <div className="VisualizacionTareas">
                        {this.state.tareas.map((tarea, index) => (
                            <TareaCard
                                key={tarea.IDTarea}
                                id_tarea={tarea.IDTarea}
                                nombreTarea={tarea.NombreTarea}
                                mes={tarea.Mes}
                                año={tarea.Año}
                                realizada={tarea.Realizada}
                                extraerTareas={this.extraerTareas} // Pasa la función extraerTareas como prop
                            />
                        ))}
                    </div>
                ) : (
                    <div className="TareasNoDisponibles">
                        <h2>Ahora mismo no hay ninguna tarea disponible.</h2>
                        <h2>¿Quiere agregar alguna?</h2>
                        <Boton ruta="/agregar-tarea" estilo="Publicar">Agregar tarea</Boton>
                    </div>
                )}
            </div>
        );
    }
}
