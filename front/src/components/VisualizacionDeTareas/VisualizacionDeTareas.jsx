import { Component } from "react";
import TareaCard from "./TareaCard/TareaCard";
import Boton from ".././comun/Boton";
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
        this.fetchTareas();
    }

    async fetchTareas() {
        try {
            const response = await axios.get("http://localhost:4001/api/tareas");
            this.setState({ tareas: response.data });
        } catch (error) {
            console.error("Error fetching tareas:", error);
        }
    }

    render() {
        return (
            <div className="Contenedor">
                <h1 className="Titulo">{this.props.titulo}</h1>

                {this.state.tareas.length > 0 ? (
                    <div className="VisualizacionTareas">
                        {this.state.tareas.map((tarea, index) => 
                            <TareaCard
                                key={tarea.IDTarea}
                                id_tarea={tarea.IDTarea}
                                nombreTarea={tarea.nombreTarea}
                                descripcion={tarea.descripcion}
                            />
                        )}
                        <div className="BotonAgregarTarea">
                            <Boton ruta="/agregar-tarea" estilo="Publicar">Agregar tarea</Boton>
                        </div>
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
