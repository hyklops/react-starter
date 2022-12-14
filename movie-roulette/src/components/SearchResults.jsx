import React from "react";

export default function SearchResults(props) {
  const { result, selectMovie } = props;
  return (
    <li
      onClick={() => {
        selectMovie(result);
      }}
      className="SearchResults"
    >
      <img src={result.Poster} width="30px" />
      <p>{result.Title}</p>
      <p>({result.Year})</p>
    </li>
  );
}
