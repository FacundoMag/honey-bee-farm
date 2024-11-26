import { Component } from "react";
import axios from "axios";
import "./TareaDetalle.css";
import { Link } from "wouter";

export default class TareaDetalle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tarea: null
        };
    }

    componentDidMount() {
        this.fetchTarea();
    }

    async fetchTarea() {
        const { id_tarea } = this.props.params;
        try {
            const response = await axios.get(`http://localhost:4001/api/tareas/${id_tarea}`);
            this.setState({ tarea: response.data });
        } catch (error) {
            console.error("Error fetching tarea:", error);
        }
    }

    render() {
        const { tarea } = this.state;

        if (!tarea) {
            return <div>Loading...</div>;
        }

        return (
            <div className="TareaDetalle">
                <div className="TareaDetalleContenido">
                    <h2>{tarea.nombreTarea}</h2>
                    <p>{tarea.descripcion}</p>
                    <Link to="/tareas">
                        <button>Cerrar</button>
                    </Link>
                </div>
            </div>
        );
    }
}
