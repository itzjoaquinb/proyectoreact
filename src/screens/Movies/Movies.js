import React, { Component } from 'react';
import CardPelicula from '../../components/CardPelicula/CardPelicula';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      urlPeliculas: `https://api.themoviedb.org/3/movie/popular?api_key=7f7f8af8dc7e7a53c53410d1521c094f`,
      cargando: true,
      pagina: 1,
    };
  }

  componentDidMount() {
    this.obtenerPeliculas();
  }

  obtenerPeliculas = () => {
    fetch(`${this.state.urlPeliculas}&page=${this.state.pagina}`)
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => ({
          peliculas: prevState.peliculas.concat(data.results),
          cargando: false,
          pagina: prevState.pagina + 1,
        }));
      })
      .catch(err => console.log('Error al obtener películas:', err));
  };

  render() {
    const { peliculas, cargando } = this.state;

    if (cargando) {
      return <h2>Cargando...</h2>;
    }

    return (
      <>
        <h2 className="alert alert-primary">Todas las películas</h2>
        <form className="filter-form px-0 mb-3">
          <input type="text" name="filter" placeholder="Buscar dentro de la lista" />
        </form>
        
        <button onClick={this.obtenerPeliculas} className="btn btn-info">Cargar más</button>

        <section className="row cards all-movies" id="movies">
          {peliculas.map(pelicula => (
            <CardPelicula
              key={pelicula.id}
              id={pelicula.id}
              titulo={pelicula.title}
              imagen={pelicula.poster_path}
              descripcion={pelicula.overview}
              tipo="movie"
            />
          ))}
        </section>
      </>
    );
  }
}

export default Movies;