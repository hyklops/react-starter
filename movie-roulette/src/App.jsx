import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";

function App() {
  const [movieResults, setMovieResults] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const [searchKey, setSearchKey] = useState();
  const api_url = "http://www.omdbapi.com/?";
  const api_key = "&apikey=36def5b4";
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

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
        <div className="selectedMovie" key={nanoid()}>
          {
            <div className="selectedMovie">
              <img className="poster" src={arr.Poster} />
            </div>
          }
        </div>
      );
    });
  };

  const [randomNumber, setRandomNumber] = useState();

  const randomMovie = () => {
    return (
      setRandomNumber(Math.floor(Math.random() * selectedMovies.length)),
      setIsClicked(true)
    );
  };

  useEffect(() => {
    if (movieResults) setIsFetched(true);
    if (!movieResults) setIsFetched(false);
  }, [movieResults]);

  useEffect(() => {
    setSelectedMovies((prevState) => {
      return prevState.map((movie, index) => {
        if (index === randomNumber && !movie.count) {
          return { ...movie, Count: 1 };
        }
        if (index === randomNumber) {
          return { ...movie, Count: movie.count++ };
        } else {
          return movie;
        }
      });
    });
  }, [randomNumber]);

  useEffect(() => {
    console.log({ movieResults });
  }, [isFetched]);

  useEffect(() => {
    console.log({ selectedMovies });
  }, [selectedMovies]);

  return (
    <div className="App">
      <div className="container">
        <h1>MOVIE BRAWL</h1>
        <p>
          You have decided to watch a movie with your friends but can't agree on
          which movie to watch?
        </p>

        <SearchBar
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          fetchMovies={fetchMovies}
          renderResults={renderResults}
          setMovieResults={setMovieResults}
          selectMovie={selectMovie}
          selectedMovies={selectedMovies}
        />
        <div className="selectedMovies">{renderSelecteds()}</div>
        {selectedMovies.length === 0 ? (
          ""
        ) : (
          <button className="green" onClick={() => randomMovie()}>
            Select Random
          </button>
        )}
        <div>
          {isClicked && (
            <div className="selectedMovie">
              <img
                className="poster"
                src={selectedMovies[randomNumber].Poster}
              />
              <h2>{selectedMovies[randomNumber].Count}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
