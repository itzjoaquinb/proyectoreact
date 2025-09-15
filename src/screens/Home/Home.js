import React, { Component } from 'react';
import CardPelicula from '../../components/CardPelicula/CardPelicula';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculasPopulares: [],
      peliculasEnCartelera: [],
      cargando: true,
      valorBuscador: '',
    };
  }

  componentDidMount() {
    const apiKey = '7f7f8af8dc7e7a53c53410d1521c094f'; 

    const urlPeliculasPopulares = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    const urlPeliculasEnCartelera = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

    Promise.all([
      fetch(urlPeliculasPopulares).then(res => res.json()),
      fetch(urlPeliculasEnCartelera).then(res => res.json()),
    ])
    .then(([datosPopulares, datosEnCartelera]) => {
      this.setState({
        peliculasPopulares: datosPopulares.results.slice(0, 4),
        peliculasEnCartelera: datosEnCartelera.results.slice(0, 4),
        cargando: false,
      });
    })
    .catch(err => console.log('Error al obtener datos:', err));
  }
  
  manejarCambios = (evento) => {
    this.setState({ valorBuscador: evento.target.value });
  };
  
  manejarEnvio = (evento) => {
    evento.preventDefault();
    this.props.history.push(`/results?search=${this.state.valorBuscador}`);
  };

  render() {
    const { peliculasPopulares, peliculasEnCartelera, cargando } = this.state;

    if (cargando) {
      return <h2>Cargando...</h2>;
    }

    return (
      <>
        <form onSubmit={this.manejarEnvio} className="search-form" method="get">
          <input 
            type="text" 
            className="" 
            name="searchData" 
            placeholder="Buscar..." 
            value={this.state.valorBuscador}
            onChange={this.manejarCambios}
          />
          <button type="submit" className="btn btn-success btn-sm">Buscar</button>
        </form>
        <section className= "title">
        <h2 className="alert alert-primary">Películas populares de la semana</h2>
             <div className="text-center my-4">
          <Link to="/peliculas?category=popular" className="btn btn-load">VER TODAS LAS PELICULAS POPULARES</Link>
        </div>
        </section>
        <section className="row cards" id="movies">
          {peliculasPopulares.map(pelicula => (
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
        

          <section className= "title">
        <h2 className="alert alert-primary">Películas en cartelera</h2>
            <div className="text-center my-4">
          <Link to="/peliculas?category=now_playing" className="btn btn-load">VER TODAS LAS PELICULAS EN CARTELERA</Link>
        </div>
        </section>
        <section className="row cards" id="now-playing">
          {peliculasEnCartelera.map(pelicula => (
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

export default Home;