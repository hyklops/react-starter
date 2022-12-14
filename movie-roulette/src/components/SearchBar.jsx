import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import Modal from "./Modal";

export default function SearchBar(props) {
  const {
    searchKey,
    setSearchKey,
    fetchMovies,
    renderResults,
    setMovieResults,
    selectMovie,
    selectedMovies,
  } = props;
  console.log({ searchKey });
  const [modalShown, toggleModal] = React.useState(false);
  const close = () => {
    toggleModal(false), setSearchKey(false), setMovieResults();
  };
  return (
    <div className="SearchBar">
      <button
        onClick={() => {
          toggleModal(!modalShown);
        }}
      >
        {selectedMovies.length === 0 ? "BRAWL NOW!" : "Search Another Movie"}
      </button>
      <Modal shown={modalShown} close={() => close()}>
        <div className="searchContainer">
          <div className="searchContainer--flex">
            <p>Search Movies</p>
            <button
              onClick={() => {
                close();
              }}
            >
              Close
            </button>
          </div>
          <p>Name of the Film</p>
          <form onSubmit={fetchMovies} className="searchBar">
            <input
              type="text"
              placeholder="Search..."
              name="search"
              onInput={(event) => setSearchKey(event.target.value)}
            />
          </form>
          <ul onClick={() => close()} className="resultsList">
            {renderResults()}
          </ul>
        </div>
      </Modal>
    </div>
  );
}
