import React, { Component } from 'react';
import CardPelicula from '../../components/CardPelicula/CardPelicula';
import Loader from '../../components/Loader/Loader';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      loading: true
    };
  }

  componentDidMount() {
    const apiKey = '7f7f8af8dc7e7a53c53410d1521c094f';
    const tipo = this.props.match.params.tipo;   // 'movie' | 'tv'
    const input = this.props.match.params.query; 

    const url = `https://api.themoviedb.org/3/search/${tipo}?api_key=${apiKey}&language=es-ES&page=1&query=${encodeURIComponent(input)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const resultados = data && data.results ? data.results : [];
        this.setState({
          datos: resultados,
          loading: false
        });
      })
      .catch(error => {
        console.log('El error fue: ' + error);
        this.setState({ loading: false });
      });
  }

  render() {
    const tipo = this.props.match.params.tipo; 

    return (
      <React.Fragment>
        <section className="all-movies">
          {this.state.loading ? (
            <Loader />
          ) : (
            this.state.datos.map(movie => {
              const titulo = movie.title ? movie.title : movie.name;
              return (
                <CardPelicula
                  key={movie.id}
                  id={movie.id}
                  titulo={titulo}
                  imagen={movie.poster_path}
                  descripcion={movie.overview}
                  // Para las rutas de detalle serie para tv y movie para películas
                  tipo={tipo === 'tv' ? 'serie' : 'movie'}
                />
              );
            })
          )}
        </section>
      </React.Fragment>
    );
  }
}

export default Results;