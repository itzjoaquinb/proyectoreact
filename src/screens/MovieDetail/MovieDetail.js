import React, { Component } from 'react';

class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pelicula: {},
      cargando: true,
      esFavorito: false, // Nuevo estado para el botón de favoritos
    };
  }

  componentDidMount() {
    const apiKey = '7f7f8af8dc7e7a53c53410d1521c094f';
    const id = this.props.match.params.id;
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

    // Obtener detalles de la película
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          pelicula: data,
          cargando: false,
        });

        // Verificar si la película ya es favorita
        let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        const yaEsta = favoritos.some(fav => fav.id === parseInt(id));

        if (yaEsta) {
          this.setState({ esFavorito: true });
        }
      })
      .catch(err => console.log('Error al obtener datos de la película:', err));
  }

  agregarAFavoritos = () => {
    const { pelicula } = this.state;
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    // Crear el objeto del favorito
    const nuevoFavorito = {
      id: pelicula.id,
      titulo: pelicula.title,
      imagen: pelicula.poster_path,
      descripcion: pelicula.overview,
      tipo: 'movie',
    };
    
    // Agregar al array y guardar en localStorage
    favoritos.push(nuevoFavorito);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    this.setState({ esFavorito: true });
  };

  quitarDeFavoritos = () => {
    const id = this.state.pelicula.id;
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    
    // Filtrar para quitar el elemento
    const favoritosActualizados = favoritos.filter(fav => fav.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritosActualizados));
    this.setState({ esFavorito: false });
  };

  render() {
    const { pelicula, cargando } = this.state;

    if (cargando) {
      return <h2>Cargando...</h2>;
    }

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
          <button className="btn alert-primary btn-fav" onClick={this.quitarDeFavoritos} title="Quitar de favoritos">
            Quitar de Favoritos ♥️
          </button>
        ) : (
          <button className="btn alert-primary btn-fav" onClick={this.agregarAFavoritos} title="Agregar a favoritos">
            Agregar a Favoritos ♡
          </button>
        )}
      </section>
    );
  }
}

export default MovieDetail;