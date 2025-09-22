import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="text-center my-5">
      <h2 className="alert alert-danger">404 — Contenido inexistente</h2>
      <p>La URL que ingresaste no existe.</p>
      <Link className="btn btn-primary mt-3" to="/">Volver al Home</Link>
    </section>
  );
}

export default NotFound;