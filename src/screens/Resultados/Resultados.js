import React, { Component } from 'react';
import CardPelicula from '../../components/CardPelicula/CardPelicula';

class Resultados extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datos: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.obtenerDatos();
  }

  componentDidUpdate(prevProps) {
    // Si la URL cambia, volvemos a obtener los datos
    if (this.props.match.params.query !== prevProps.match.params.query) {
      this.obtenerDatos();
    }
  }

  obtenerDatos = () => {
    const apiKey = '7f7f8af8dc7e7a53c53410d1521c094f';
    const tipo = this.props.match.params.tipo;
    const input = this.props.match.params.query;
    
    // El 'endpoint' de la API de búsqueda
    const url = `https://api.themoviedb.org/3/search/${tipo}?language=en-US&page=1&query=${input}&api_key=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({
          datos: data.results,
          loading: false,
        });
      })
      .catch(error => {
        console.log('El error fue: ' + error);
        this.setState({ loading: false });
      });
  };

  render() {
    const { datos, loading } = this.state;
    const tipo = this.props.match.params.tipo;

    if (loading) {
      return <h2>Cargando...</h2>;
    }

    if (datos.length === 0) {
      return <h2 className="text-center my-5">No se encontraron resultados.</h2>;
    }

    return (
      <React.Fragment>
        <h2 className="alert alert-info">Resultados de la búsqueda</h2>
        <section className="row cards">
          {datos.map(item => (
            <CardPelicula
              key={item.id}
              id={item.id}
              titulo={item.title || item.name}
              imagen={item.poster_path}
              descripcion={item.overview}
              tipo={tipo === 'movie' ? 'movie' : 'serie'} // Aseguramos el tipo para la ruta de detalle
            />
          ))}
        </section>
      </React.Fragment>
    );
  }
}

export default Resultados;