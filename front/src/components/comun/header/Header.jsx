import React, { Component } from 'react';
import "./Header.css";

export default class HeaderLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false, 
        };
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({ isLoggedIn: true });
        }
    }

    render() {
        const { isLoggedIn } = this.state;

        return (
            <header>
                <div className="logo">
                    <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen_2024-10-28_125843649-YlENPv3QqPjfwtwQH7QfAbbKhasl4J.png" alt="GREIDANUS HONEYBEE FARM" className="logo-image" />
                    <span>GREIDANUS HONEYBEE</span>
                </div>
                {isLoggedIn && (
                    <nav>
                        <ul>
                            <li><a href="/dashboard">Home</a></li>
                            <li><a href="/estadisticas/dashboard">Estadísticas</a></li>
                            <li><a href="/trabajos">Trabajos</a></li>
                            <li><a href="/apiarios">Apiarios</a></li>
                        </ul>
                    </nav>
                )}
            </header>
        );
    }
}
