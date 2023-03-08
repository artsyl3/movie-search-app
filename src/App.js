import React, { useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import './styles.css';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const apiKey = '56019083';

  const searchMovies = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
    );
    setMovies(response.data.Search);
    setSearchTerm('');
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClose = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="App">
      <div className="search-container">
        <h2 className="title">Movie Search</h2>
        <form onSubmit={searchMovies}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a movie..."
              aria-label="Search for a movie..."
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="movies-container">
        {movies.map((movie) => (
          <Card
            key={movie.imdbID}
            className="movie-card"
            onClick={() => setSelectedMovie(movie)}
          >
            <Card.Img
              variant="top"
              src={movie.Poster === 'N/A' ? 'https://via.placeholder.com/300x450' : movie.Poster}
              alt={`Poster of ${movie.Title}`}
              className="movie-poster"
            />
            <Card.Body className="movie-card-body">
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>
                Year: {movie.Year}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
