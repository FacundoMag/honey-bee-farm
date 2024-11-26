import { Component } from "react";
import axios from "axios";
import "./TareaCard.css";
import { Link } from "wouter";

export default class TareaCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detalles: null
        };
    }

    componentDidMount() {
        this.fetchDetalles();
    }

    async fetchDetalles() {
        try {
            const response = await axios.get(`http://localhost:4001/api/tareas/${this.props.id_tarea}`);
            this.setState({ detalles: response.data });
        } catch (error) {
            console.error("Error fetching detalles:", error);
        }
    }

    render() {
        const { id_tarea, nombreTarea, descripcion } = this.props;
        const rutaCodificada = `/ver-tarea/${id_tarea}`;

        return (
            <div className="TareaCard">
                <Link to={rutaCodificada}>
                    <div className="ContenidoTarea">
                        <h3>{nombreTarea}</h3>
                        <p>{descripcion}</p>
                    </div>
                </Link>
            </div>
        );
    }
}
