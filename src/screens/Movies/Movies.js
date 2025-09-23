import React, { Component } from 'react';
import CardPelicula from '../../components/CardPelicula/CardPelicula';
import { Link } from 'react-router-dom';

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      pagina: 1,
      cargando: true,
      titulo: 'Todas las películas',
      filtroPeliculas: '', // Estado para el valor del filtro
    };
  }

  componentDidMount() {
    this.obtenerPeliculas();
  }

  obtenerPeliculas = () => {
    const apiKey = '7f7f8af8dc7e7a53c53410d1521c094f';
    const categoria = new URLSearchParams(this.props.location.search).get("category");
    let url = '';
    
    if (categoria === 'popular') {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${this.state.pagina}`;
        this.setState({ titulo: 'Películas populares' });
    } else if (categoria === 'now_playing') {
        url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${this.state.pagina}`;
        this.setState({ titulo: 'Películas en cartelera' });
    } else {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${this.state.pagina}`;
        this.setState({ titulo: 'Todas las películas' });
    }

    fetch(url)
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
  
  manejarCambios = (e) => {
    this.setState({ filtroPeliculas: e.target.value });
  };

  render() {
    const { peliculas, cargando, titulo, filtroPeliculas } = this.state;

    if (cargando) {
      return <h2>Cargando...</h2>;
    }
    
  const peliculasFiltradas = peliculas.filter(function(pelicula) {
  var titulo = '';
  if (pelicula && pelicula.title) {
    titulo = pelicula.title;
  } else if (pelicula && pelicula.name) {
    titulo = pelicula.name;
  }
  return titulo.toLowerCase().includes(filtroPeliculas.toLowerCase());
});


    return (
      <>
        <h2 className="alert alert-primary">{titulo}</h2>
        n<form className="filter-form px-0 mb-3" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            name="filter" 
            placeholder="Buscar dentro de la lista" 
            value={filtroPeliculas}
            onChange={this.manejarCambios}
          />
        </form>
        

        <section className="row cards all-movies">
          {peliculasFiltradas.length > 0 ? (
            peliculasFiltradas.map(pelicula => (
              <CardPelicula
                key={pelicula.id}
                id={pelicula.id}
                titulo={pelicula.title}
                imagen={pelicula.poster_path}
                descripcion={pelicula.overview}
                tipo="movie"
              />
            ))
          ) : (
            <p>No se encontraron películas que coincidan.</p>
          )}
        </section>
        <button onClick={this.obtenerPeliculas} className="btn btn-info">Cargar más</button>

      </>
    );
  }
}

export default Movies;