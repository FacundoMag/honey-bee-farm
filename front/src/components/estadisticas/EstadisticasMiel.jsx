import { Component } from "react";
import axios from "axios";
import Header from "../comun/header/Header";
import "./EstadisticasMiel.css";

export default class EstadisticasMiel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            areaSeleccionada: "",
            estadisticas: [],
            areas: []
        };
    }

    // Trae el token del sessionStorage y verifica su existencia
    componentDidMount() {
        const token = sessionStorage.getItem("token");
        if (token) {
            this.extraerAreas(token);
        } else {
            window.location.href = "/iniciar-sesion";
        }
    }

    // Esta función va a extraer las áreas disponibles
    extraerAreas(token) {
        const url = "http://localhost:4001/api/areas";

        const config = {
            headers: {
                authorization: token,
            },
        };

        axios.get(url, config)
            .then((response) => {
                this.setState({ areas: response.data });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Esta función va a extraer las estadísticas de miel por área
    extraerEstadisticas(token, areaId) {
        const url = `http://localhost:4001/api/miel/${areaId}`;

        const config = {
            headers: {
                authorization: token,
            },
        };

        axios.get(url, config)
            .then((response) => {
                this.setState({ estadisticas: response.data });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Maneja el cambio de área seleccionada
    manejarCambio = (event) => {
        const areaId = event.target.value;
        this.setState({ areaSeleccionada: areaId });

        const token = sessionStorage.getItem("token");
        if (token) {
            this.extraerEstadisticas(token, areaId);
        }
    };

    render() {
        return (
            <> 
                <Header
                    isAuthenticated={true}  // Pasará el estado de autenticación
                    onLogout={this.props.onLogout}
                />

                <div style={{ margin: "20px 0", textAlign: "center" }}>
                    <label htmlFor="areaSeleccionada" style={{ marginRight: "10px" }}>
                        Selecciona un área:
                    </label>
                    <select
                        id="areaSeleccionada"
                        value={this.state.areaSeleccionada}
                        onChange={this.manejarCambio}
                        style={{ padding: "5px", fontSize: "16px" }}
                    >
                        <option value="">Seleccionar área</option>
                        {this.state.areas.map((area) => (
                            <option key={area.IDArea} value={area.IDArea}>{area.NombreArea}</option>
                        ))}
                    </select>
                </div>

                {this.state.estadisticas.length > 0 ? (
                    <div className="Estadisticas">
                        <h1 className="Titulo">Estadísticas de Miel Recolectada</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mes</th>
                                    <th>Kilos de Miel</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.estadisticas.map((stat, index) => (
                                    <tr key={index}>
                                        <td>{stat.mes}</td>
                                        <td>{stat.kilos_miel}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="EstadisticasNoDisponibles">
                        <h2>Seleccione un área para ver las estadísticas de miel recolectada.</h2>
                    </div>
                )}
            </>
        );
    }
}
