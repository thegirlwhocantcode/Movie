import './App.css';
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';

//api key
// 67eb4c41

const API_URL = 'http://www.omdbapi.com?apikey=67eb4c41'

const movie1 = {
  "Poster" : "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  "Title" : "Shrek",
  "Type" : "movie",
  "Year" : "2001",
  "imdbID" : "tt0126029"
}

const App = () => {

  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Shrek')
  }, [])
  
  return (
      <div className='app'>
        <h1>MovieLand</h1>
        <div className='search'>
          <input
            placeholder='Search for Movies'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img
            src = 'file:///Users/shwethakrishnan/Downloads/search-svgrepo-com.svg'
            alt='search'
            onClick={() => searchMovies(searchTerm)}
            />
        </div>

        {
          movies?.length > 0
          ? (
            <div className='container'>
          {movies.map((movie) => (
            <MovieCard movie = {movie}/>
          )) }
        </div>
          )
          : (
            <div className='empty'>
              <h3>No movies found</h3>
            </div>
          )
        }
        
      </div>
      
  );
}

export default App;
