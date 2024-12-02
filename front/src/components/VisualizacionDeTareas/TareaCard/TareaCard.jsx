import { Component } from "react";
import axios from "axios";
import Notificacion from "../../comun/Notificacion";
import "./TareaCard.css";

export default class TareaCard extends Component {
    constructor(props) {
        super(props);
        // Vinculamos explícitamente la función al contexto de la clase
        this.finalizarTarea = this.finalizarTarea.bind(this);
    }

    finalizarTarea(id) {
        const url = "http://localhost:5000/api/tareas";
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            params: { id }
        };

        const data = { IDEstado: 1 };

        axios.put(url, data, config)
            .then((response) => {
                // Aquí se ejecuta la función que pasa el padre (extraerTareas)
                if (typeof this.props.extraerTareas === 'function') {
                    this.props.extraerTareas();
                    Notificacion.show("Se ha finalizado la tarea.", "success");
                } else {
                    console.error("extraerTareas no es una función");
                }
            })
            .catch((error) => {
                console.error("Error al querer finalizar la tarea:", error);
            });
    }

    render() {
        const { id_tarea, nombreTarea, mes, año, realizada } = this.props;

        return (
            <div className="TareaCard" style={{ position: "relative" }}>
                <div className="ContenidoTarea">
                    {realizada === 1 ? (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="12" fill="#00C853" />
                                <path d="M9 12.5l2 2L15 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <h2 style={{ margin: "7.5px 0 0 5px" }}>Tarea realizada</h2>
                        </div>
                    ) : realizada === 2 ? (
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="12" fill="#FFC107" />
                                <path d="M12 7v6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="12" cy="16" r="1" fill="#fff" />
                            </svg>
                            <h2 style={{ margin: "7.5px 0 0 5px" }}>Tarea pendiente</h2>
                        </div>
                    ) : null}

                    <h1>{nombreTarea}</h1>
                    <h2>{mes}, {año}</h2>
                </div>

                {realizada === 2 && (
                    <div style={{ position: "absolute", bottom: "10px", right: "20px" }}>
                        <input
                            type="checkbox"
                            onChange={() => this.finalizarTarea(id_tarea)}  // Aquí se llama a finalizarTarea
                            className="checkTarea"
                        />
                    </div>
                )}
            </div>
        );
    }
}
