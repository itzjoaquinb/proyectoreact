import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.css';

class CardPelicula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verDescripcion: false,
      textoBoton: 'Ver descripción',
    };
  }

  manejarDescripcion = () => {
    this.setState(prevState => ({
      verDescripcion: !prevState.verDescripcion,
      textoBoton: prevState.verDescripcion ? 'Ver descripción' : 'Ocultar descripción',
    }));
  };

  render() {
    const { id, titulo, imagen, descripcion, tipo } = this.props;
    
    const urlImagen = `https://image.tmdb.org/t/p/w500/${imagen}`;

    return (
      <article className="single-card-movie">
        <img src={urlImagen} className="card-img-top" alt={titulo} />
        <div className="cardBody">
          <h5 className="card-title">{titulo}</h5>
          <section className= "section-desc">
          {this.state.verDescripcion && (
            <p className="card-text">{descripcion}</p>
          )}

          <button className="btn btn-primary" onClick={this.manejarDescripcion}>
            {this.state.textoBoton}
          </button>
          
          <Link to={`/${tipo}/${id}`} className="btn btn-primary">
            Ir a detalle
          </Link>
          
          <button className="btn alert-primary">
            ♥️
          </button>
          </section>
        </div>
      </article>
    );
  }
}

export default CardPelicula;