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
      </section>
    );
  }
}

export default MovieDetail;