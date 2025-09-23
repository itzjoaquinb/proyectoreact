import React, { Component } from 'react';
import CardPelicula from '../../components/CardPelicula/CardPelicula'; 
import { Link } from 'react-router-dom';

class Series extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      seriesOriginales: [], // Estado para guardar la lista completa
      urlSeries: `https://api.themoviedb.org/3/tv/popular?api_key=7f7f8af8dc7e7a53c53410d1521c094f`,
      cargando: true,
      pagina: 1,
      filtroSeries: '',
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
          seriesOriginales: prevState.seriesOriginales.concat(data.results),
          cargando: false,
          pagina: prevState.pagina + 1,
        }));
      })
      .catch(err => console.log('Error al obtener series:', err));
  };

manejarCambios = (e) => {
  const filtro = e.target.value;

  const seriesFiltradas = this.state.seriesOriginales.filter(function(serie) {
    var nombre = '';
    if (serie && serie.name) {
      nombre = serie.name;
    } else if (serie && serie.title) {
      nombre = serie.title;
    }
    return nombre.toLowerCase().includes(filtro.toLowerCase());
  });

  this.setState({ 
    series: seriesFiltradas,
    filtroSeries: filtro,
  });
};

  render() {
    const { series, cargando, filtroSeries } = this.state;

    if (cargando) {
      return <h2>Cargando...</h2>;
    }

    return (
      <>
        <h2 className="alert alert-warning">Todas las series</h2>
        <form className="filter-form px-0 mb-3" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            name="filter" 
            placeholder="Buscar dentro de la lista" 
            value={filtroSeries}
            onChange={this.manejarCambios}
          />
        </form>
        

        <section className="row cards all-series" id="series">
          {series.length > 0 ? (
            series.map(serie => (
              <CardPelicula
                key={serie.id}
                id={serie.id}
                titulo={serie.name}
                imagen={serie.poster_path}
                descripcion={serie.overview}
                tipo="serie"
              />
            ))
          ) : (
            <p>No se encontraron series que coincidan.</p>
          )}
        </section>
        <button onClick={this.obtenerSeries} className="btn btn-warning">Cargar más</button>

      </>
    );
  }
}

export default Series;