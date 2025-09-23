import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      tipo: 'movie',
    };
  }

  controlarCambios = (event) => {
    this.setState({ name: event.target.value });
  };

  controlarTipo = (event) => {
    this.setState({ tipo: event.target.value });
  };

  evitarSubmit = (event) => {
    event.preventDefault();
    if (this.state.name.trim() !== '') {
      this.props.history.push(
        `/results/${this.state.tipo}/${this.state.name}`
      );
    }
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.evitarSubmit}>
        <input 
          type='text' 
          placeholder="Buscar una pelicula o serie..." 
          onChange={this.controlarCambios} 
          value={this.state.name}
        ></input>
        <select value={this.state.tipo} onChange={this.controlarTipo}>
          <option value="movie">Películas</option>
          <option value="tv">Series</option>
        </select>
        <button type="submit" className="btn btn-success btn-sm">Buscar</button>
      </form>
    );
  }
}

export default withRouter(SearchForm);