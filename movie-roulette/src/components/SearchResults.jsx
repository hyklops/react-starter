import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

export default function SearchResults(props) {
  const { result, selectMovie, close } = props;
  return (
    <li
      onClick={() => {
        selectMovie(result);
        close();
      }}
      className="SearchResults"
    >
      <img src={result.Poster} width="30px" />
      <p>{result.Title}</p>
      <p>({result.Year})</p>
    </li>
  );
}
