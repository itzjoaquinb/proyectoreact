import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/styles.css';

class CardPelicula extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verDescripcion: false,
      textoBoton: 'Ver descripción',
      esFavorito: false
    };
  }

  componentDidMount() {
    const id = this.props.id;
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const yaEsta = favoritos.some(fav => fav.id === id);

    if (yaEsta) {
      this.setState({ esFavorito: true });
    }
  }

  manejarDescripcion = () => {
    this.setState(prevState => ({
      verDescripcion: !prevState.verDescripcion,
      textoBoton: prevState.verDescripcion ? 'Ver descripción' : 'Ocultar descripción',
    }));
  };

  agregarAFavoritos = () => {
    const id = this.props.id;
    const { titulo, imagen, descripcion, tipo } = this.props;

    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const yaEsta = favoritos.some(fav => fav.id === id);

    if (!yaEsta) {
      const nuevoFavorito = {
        id: id,
        titulo: titulo,
        imagen: imagen,
        descripcion: descripcion,
        tipo: tipo,
      };
      favoritos.push(nuevoFavorito);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      this.setState({ esFavorito: true });
    }
  };

  quitarDeFavoritos = () => {
    const id = this.props.id;
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const favoritosActualizados = favoritos.filter(fav => fav.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritosActualizados));
    this.setState({ esFavorito: false });
  };

  render() {
    const { id, titulo, imagen, descripcion, tipo } = this.props;

    let urlImagen = '';
    if (imagen) {
      urlImagen = `https://image.tmdb.org/t/p/w500/${imagen}`;
    }

    return (
      <article className="single-card-movie">
        {urlImagen ? (
          <img src={urlImagen} className="card-img-top" alt={titulo} />
        ) : (
          <div className="no-image">Sin imagen</div>
        )}

        <div className="cardBody">
          <h5 className="card-title">{titulo}</h5>
          <section className="section-desc">
            {this.state.verDescripcion && (
              <p className="card-text">{descripcion}</p>
            )}
            <button className="btn btn-primary" onClick={this.manejarDescripcion}>
              {this.state.textoBoton}
            </button>
            <Link to={`/${tipo}/${id}`} className="btn btn-primary">
              Ir a detalle
            </Link>
            {this.state.esFavorito ? (
              <button className="btn alert-primary" onClick={this.quitarDeFavoritos} title="Quitar de favoritos">
                ♥️
              </button>
            ) : (
              <button className="btn alert-primary" onClick={this.agregarAFavoritos} title="Agregar a favoritos">
                ♡
              </button>
            )}
          </section>
        </div>
      </article>
    );
  }
}

export default CardPelicula;