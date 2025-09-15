import React, { Component } from 'react';
import CardPelicula from '../../components/CardPelicula/CardPelicula'; // El mismo componente de tarjeta
import { Link } from 'react-router-dom';

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      urlSeries: `https://api.themoviedb.org/3/tv/popular?api_key=7f7f8af8dc7e7a53c53410d1521c094f`,
      cargando: true,
      pagina: 1,
    };
  }

  componentDidMount() {
    this.obtenerSeries();
  }

  obtenerSeries = () => {
    fetch(`${this.state.urlSeries}&page=${this.state.pagina}`)
      .then(res => res.json())
      .then(data => {
        this.setState(prevState => ({
          series: prevState.series.concat(data.results),
          cargando: false,
          pagina: prevState.pagina + 1,
        }));
      })
      .catch(err => console.log('Error al obtener series:', err));
  };

  render() {
    const { series, cargando } = this.state;

    if (cargando) {
      return <h2>Cargando...</h2>;
    }

    return (
      <>
        <h2 className="alert alert-warning">Todas las series</h2>
        <form className="filter-form px-0 mb-3">
          <input type="text" name="filter" placeholder="Buscar dentro de la lista" />
        </form>
        

        <section className="row cards all-series" id="series">
          {series.map(serie => (
            <CardPelicula
              key={serie.id}
              id={serie.id}
              titulo={serie.name}
              imagen={serie.poster_path}
              descripcion={serie.overview}
              tipo="serie"
            />

          ))}
        </section>
        <button onClick={this.obtenerSeries} className="btn btn-warning">Cargar más</button>

      </>
    );
  }
}

export default Series;