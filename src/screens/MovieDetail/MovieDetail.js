import React, { Component } from 'react';

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: {},
      cargando: true,
    };
  }

  componentDidMount() {
    const apiKey = '7f7f8af8dc7e7a53c53410d1521c094f';
    const id = this.props.match.params.id;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          pelicula: data,
          cargando: false,
        });
      })
      .catch(err => console.log('Error al obtener datos de la película:', err));
  }

    agregarAFavoritos = () => {
    const id = this.props.id;

    let favoritos = [];
    let datosEnLocalStorage = localStorage.getItem('LSfavoritos');
    if (datosEnLocalStorage != null) {
      favoritos = JSON.parse(datosEnLocalStorage);
    }

    const yaEsta = favoritos.filter(function (unID) { return unID === id; });
    if (yaEsta.length === 0) {
      favoritos.push(id); 
      localStorage.setItem('LSfavoritos', JSON.stringify(favoritos));
      this.setState({ esFavorito: true }); 
    }
  };

  quitarDeFavoritos = () => {
    const id = this.props.id;

    let favoritos = [];
    let datosEnLocalStorage = localStorage.getItem('LSfavoritos');
    if (datosEnLocalStorage != null) {
      favoritos = JSON.parse(datosEnLocalStorage);
    }

    const favoritosActualizados = favoritos.filter(function (unID) { return unID !== id; });
    localStorage.setItem('LSfavoritos', JSON.stringify(favoritosActualizados));
    this.setState({ esFavorito: false });
  };

  render() {
    const { pelicula, cargando } = this.state;

    if (cargando) return <h2>Cargando...</h2>;

    return (
      <section className="detail-movie">
        <img className="col-md-6" src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} alt={pelicula.title} />
        <section className="detail-movieadad">
          <h3>Descripción</h3>
          <h2 className="alert alert-primary">{pelicula.title}</h2>
          <p className="description">{pelicula.overview}</p>
          <p id="release-date"><strong>Fecha de estreno:</strong> {pelicula.release_date}</p>
        <p id="runtime"><strong>Duración:</strong> {pelicula.runtime} Minutos</p>
          <p id="votes"><strong>Puntuación:</strong> {pelicula.vote_average} / 10</p>
          <p id="genres"><strong>Géneros:</strong> {pelicula.genres.map(g => g.name).join(', ')}</p>
        </section>
          {this.state.esFavorito ? (
              <button className="btn alert-primary" onClick={this.quitarDeFavoritos} title="Quitar de favoritos">
                Quitar de Favoritos ♥️
              </button>
            ) : (
              <button className="btn alert-primary" onClick={this.agregarAFavoritos} title="Agregar a favoritos">
                Agregar a Favoritos ♡
              </button>
            )}
      </section>
    );
  }
}

export default MovieDetail;