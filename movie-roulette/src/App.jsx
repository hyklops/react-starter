import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import SelectedMovies from "./components/SelectedMovies";

function App() {
  const [movieResults, setMovieResults] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const [searchKey, setSearchKey] = useState();
  const api_url = "http://www.omdbapi.com/?";
  const api_key = "&apikey=36def5b4";
  const [selectedMovies, setSelectedMovies] = useState([]);

  const fetchMovies = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (searchKey && searchKey !== "") {
      const data = await axios.get(`${api_url}s=${searchKey}${api_key}`);
      return setMovieResults(data.data.Search);
    }
  };

  const renderResults = () => {
    if (isFetched === true) {
      return movieResults?.map((result) => {
        return (
          <SearchResults
            key={nanoid()}
            result={result}
            selectMovie={selectMovie}
            close={close}
          />
        );
      });
    }
  };

  const selectMovie = (result) => {
    return setSelectedMovies((prev) => {
      return [...prev, result];
    });
  };

  const renderSelecteds = () => {
    return selectedMovies.map((arr) => {
      return (
        <div key={nanoid()}>
          {
            <div>
              <img className="poster" src={arr.Poster} />
              <p className="movie-title">{arr.Title}</p>
            </div>
          }
        </div>
      );
    });
  };

  useEffect(() => {
    if (movieResults) setIsFetched(true);
    if (!movieResults) setIsFetched(false);
  }, [movieResults]);

  useEffect(() => {
    console.log({ movieResults });
  }, [isFetched]);

  useEffect(() => {
    console.log({ selectedMovies });
  }, [selectedMovies]);

  return (
    <div className="App">
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        fetchMovies={fetchMovies}
        renderResults={renderResults}
        setMovieResults={setMovieResults}
        selectMovie={selectMovie}
      />
      <div className="selectedMovies">{renderSelecteds()}</div>
    </div>
  );
}

export default App;
