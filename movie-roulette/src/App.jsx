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
        return <SearchResults key={nanoid()} result={result} />;
      });
    }
  };

  useEffect(() => {
    if (movieResults) setIsFetched(true);
    if (!movieResults) setIsFetched(false);
  }, [movieResults]);

  useEffect(() => {
    console.log({ movieResults });
  }, [isFetched]);

  return (
    <div className="App">
      <SearchBar
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        fetchMovies={fetchMovies}
        renderResults={renderResults}
      />
    </div>
  );
}

export default App;
