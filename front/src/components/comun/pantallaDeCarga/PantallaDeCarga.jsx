import { Component } from "react";
import "./PantallaDeCarga.css";

export default class PantalaDeCarga extends Component {
    render() {
        return(
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div className="loading-screen">
                <div className="spinner"></div>
                    <p className="loading-text">Cargando...</p>
                </div>
            </div>
        )
    }
}