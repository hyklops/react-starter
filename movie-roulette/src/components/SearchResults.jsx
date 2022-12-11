import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

export default function SearchResults(props) {
  const { result } = props;
  return (
    <li className="SearchResults">
      <img src={result.Poster} width="30px" />
      <p>{result.Title}</p>
      <p>({result.Year})</p>
    </li>
  );
}
