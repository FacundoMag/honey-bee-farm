import { Component } from "react";
import usuario from "../../../assets/usuario.png";
import { Link } from 'wouter';
import './Header.css';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false
        };
    }

    toggleMenu = () => {
        this.setState(prevState => ({
            isMenuOpen: !prevState.isMenuOpen
        }));
    };

    handleLogout = () => {
        sessionStorage.removeItem("token");
        localStorage.removeItem("token");

        if (this.props.onLogout) {
            this.props.onLogout(); // Llama al método que recibe el logout
        }
    };

    render() {
        return (
            <header>
                {this.props.isAuthenticated ? (  // Verifica si está autenticado
                    <>
                        <div className="Secciones" style={{ justifyContent: "left", paddingLeft: "50px" }}>
                            <div className="logo">
                                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen_2024-10-28_125843649-YlENPv3QqPjfwtwQH7QfAbbKhasl4J.png" alt="GREIDANUS HONEYBEE FARM" className="logo-image" />
                                <span>GREIDANUS HONEYBEE</span>
                            </div>
                        </div>

                        <div className="Secciones" style={{ justifyContent: "center" }}>
                            <Link to="/tareas" className="HeaderLink">Tareas</Link>
                            <Link to="/areas" className="HeaderLink">Áreas</Link>
                            <Link to="/registros" className="HeaderLink">Registros</Link>
                            <Link to="/estadisticas" className="HeaderLink">Estadísticas</Link>
                            <Link to="/apiarios" className="HeaderLink">Apiarios</Link>
                        </div>

                        <div className="Secciones" style={{ justifyContent: "right", marginRight: "60px" }}>
                            <div className="Usuario" onClick={this.toggleMenu}>
                                <img 
                                    src={usuario} 
                                    alt="ERROR" 
                                    style={{ height: "25px", width: "35px" }}
                                />
                            </div>

                            {this.state.isMenuOpen && (
                                <div className="MenuDesplegable">
                                    <Link to={`/editar-usuario/${this.props.usuario_id}`} className="MenuLink">Editar usuario</Link>
                                    <button className="CerrarSesion" onClick={this.handleLogout}>Cerrar sesión</button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="Secciones" style={{ justifyContent: "left", paddingLeft: "50px" }}>
                            <div className="logo">
                                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen_2024-10-28_125843649-YlENPv3QqPjfwtwQH7QfAbbKhasl4J.png" alt="GREIDANUS HONEYBEE FARM" className="logo-image" />
                                <span>GREIDANUS HONEYBEE</span>
                            </div>
                        </div>

                        <div className="Secciones"></div>

                        <div className="Secciones" style={{ paddingRight: "20px" }}></div>
                    </>
                )}
            </header>
        );
    }
}
