import React, { Component } from 'react';
import './Header.css';

class HeaderSimple extends Component {
  render() {
    return (
      <header className="header">
        <div className="logo">
          <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imagen_2024-10-28_125843649-YlENPv3QqPjfwtwQH7QfAbbKhasl4J.png" alt="GREIDANUS HONEYBEE FARM" className="logo-image" />
          <span>GREIDANUS HONEYBEE</span>
        </div>
      </header>
    );
  }
}

export default HeaderSimple;
