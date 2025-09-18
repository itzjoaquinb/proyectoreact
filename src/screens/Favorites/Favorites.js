import React, { Component } from 'react';
import CardPelicula from '../../components/CardPelicula/CardPelicula';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritos: [],
    };
  }

  componentDidMount() {
    this.obtenerFavoritos();
  }

  // Método para obtener la lista de favoritos del localStorage
  obtenerFavoritos = () => {
    const favoritosGuardados = JSON.parse(localStorage.getItem('favoritos')) || [];
    this.setState({ favoritos: favoritosGuardados });
  };
  
  // Método para eliminar un favorito de la lista
  eliminarFavorito = (id) => {
    const favoritosActualizados = this.state.favoritos.filter(fav => fav.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritosActualizados));
    this.setState({ favoritos: favoritosActualizados });
  };

  render() {
    const { favoritos } = this.state;
    const peliculasFavoritas = favoritos.filter(fav => fav.tipo === 'movie');
    const seriesFavoritas = favoritos.filter(fav => fav.tipo === 'serie');

    return (
      <>
        <h2 className="alert alert-primary">Películas favoritas</h2>
        {peliculasFavoritas.length === 0 ? (
          <p>No tienes películas favoritas.</p>
        ) : (
          <section className="row cards">
            {peliculasFavoritas.map(fav => (
              <CardPelicula
                key={fav.id}
                id={fav.id}
                titulo={fav.titulo}
                imagen={fav.imagen}
                descripcion={fav.descripcion}
                tipo={fav.tipo}
                // Pasamos la función de eliminación como una prop
                onEliminar={this.eliminarFavorito}
              />
            ))}
          </section>
        )}

        <h2 className="alert alert-warning">Series favoritas</h2>
        {seriesFavoritas.length === 0 ? (
          <p>No tienes series favoritas.</p>
        ) : (
          <section className="row cards">
            {seriesFavoritas.map(fav => (
              <CardPelicula
                key={fav.id}
                id={fav.id}
                titulo={fav.titulo}
                imagen={fav.imagen}
                descripcion={fav.descripcion}
                tipo={fav.tipo}
                // Pasamos la función de eliminación como una prop
                onEliminar={this.eliminarFavorito}
              />
            ))}
          </section>
        )}
      </>
    );
  }
}

export default Favorites;