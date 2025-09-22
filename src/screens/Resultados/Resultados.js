import React, { Component } from 'react';
import CardPelicula from '../../components/CardPelicula/CardPelicula';
import Loader from '../../components/Loader/Loader';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: ''
  }
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      loading: true
    };
  }

  componentDidMount() {
    const tipo = this.props.match.params.tipo;  
    const input = this.props.match.params.query; 

    fetch(`https://api.themoviedb.org/3/search/${tipo}?language=es-ES&page=1&query=${encodeURIComponent(input)}`, options)
      .then(response => response.json())
      .then(data => this.setState({
        datos: data.results || [],
        loading: false
      }))
      .catch(error => {
        console.log('El error fue: ' + error);
        this.setState({ loading: false });
      });
  }

 render() {
  const tipo = this.props.match.params.tipo; // 'movie' | 'tv'

  return (
    <React.Fragment>
      <section className="all-movies">
        {this.state.loading ? (
          <Loader />
        ) : (
          this.state.datos.map(movie => (
            <CardPelicula
              key={movie.id}
              id={movie.id}
              titulo={movie.title || movie.name}
              imagen={movie.poster_path}         // CardPelicula falta la URL completa
              descripcion={movie.overview}
              tipo={tipo === 'tv' ? 'serie' : 'movie'} 
            />
          ))
        )}
      </section>
    </React.Fragment>
  );
}

}

export default Results;