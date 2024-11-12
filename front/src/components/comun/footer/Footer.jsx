import React, { Component } from 'react';
import "./Footer.css";

export default class Footer extends Component {
    render() {
        return (
            <footer>
                <nav>
                    <ul>
                        <li><a href="#">Características</a></li>
                        <li><a href="#">Acerca de</a></li>
                        <li><a href="#">Contacto</a></li>
                    </ul>
                </nav>
            </footer>
        );
    }
}
