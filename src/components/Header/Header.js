import React from 'react';
import { Link } from 'react-router-dom';
import SearchForm from '../SearchForm/SearchForm'; // Importas el componente
import '../../styles/styles.css'; 

function Header() {
  return (
    <nav>
      <ul className="nav nav-tabs my-4">
        <li className="nav-item">
          <Link className="nav-link" to="/">HOME</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/peliculas">PELICULAS</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/series">SERIES</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/favoritos">FAVORITAS</Link>
        </li>
      </ul>
      {/* Implementas el componente SearchForm aquí */}
      <SearchForm /> 
    </nav>
  );
}

export default Header;