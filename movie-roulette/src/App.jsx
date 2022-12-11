import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { nanoid } from "nanoid";
import SearchBar from "./components/SearchBar";

function App() {
  const [movieResults, setMovieResults] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const api_url = "http://www.omdbapi.com/?";
  const api_key = "&apikey=36def5b4";

  const fetchMovies = async (movieName) => {
    const data = await axios.get(`${api_url}s=${movieName}${api_key}`);
    return setMovieResults(data.data.Search);
  };

  const renderPoster = () => {
    if (isFetched === true) {
      return movieResults?.map((result) => {
        return <img src={`${result.Poster}`} key={nanoid()} />;
      });
    }
  };

  useEffect(() => {
    fetchMovies("space");
  }, []);

  useEffect(() => {
    if (movieResults) setIsFetched(true);
    if (!movieResults) setIsFetched(false);
  }, [movieResults]);

  useEffect(() => {
    console.log({ movieResults });
  }, [isFetched]);

  return isFetched ? (
    <div className="App">
      <SearchBar />
      <div className="posters">{renderPoster()}</div>
    </div>
  ) : (
    <h1>loading </h1>
  );
}

export default App;
