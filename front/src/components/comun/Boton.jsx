import { Component } from 'react'
import { Link } from 'wouter';

export default class Boton extends Component {
    constructor(props){
        super(props);
    }

  render() {
    return (
        <Link to={this.props.ruta} className={this.props.estilo}>
            {this.props.children}
        </Link>
    )
  }
}