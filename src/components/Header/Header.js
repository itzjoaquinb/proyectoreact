import React from 'react';
import { Link } from 'react-router-dom';
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
      <form className="search-form" action="results.html" method="get">
        <input type="text" name="searchData" placeholder="Buscar..." value="" />
        <button type="submit" className="btn btn-success btn-sm">Buscar</button>
      </form>
    </nav>
  );
}

export default Header;