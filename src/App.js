import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './screens/Home/Home';
import Movies from './screens/Movies/Movies';
import Series from './screens/Series/Series';
import Favorites from './screens/Favorites/Favorites';
import Results from './screens/Resultados/Resultados';
import MovieDetail from './screens/MovieDetail/MovieDetail';
import SerieDetail from './screens/SerieDetail/SerieDetail';
import './styles/styles.css'; // Importa el archivo CSS


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/peliculas" exact component={Movies} />
            <Route path="/series" exact component={Series} />
            <Route path="/favoritos" exact component={Favorites} />
            <Route path="/results" component={Results} />
            <Route path="/peli/:id" component={MovieDetail} />
            <Route path="/serie/:id" component={SerieDetail} />
          </Switch>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;