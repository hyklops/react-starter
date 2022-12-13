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
  } = props;
  console.log({ searchKey });
  const [modalShown, toggleModal] = React.useState(false);
  const close = () => {
    toggleModal(false), setSearchKey(false), setMovieResults();
  };
  return (
    <>
      <button
        onClick={() => {
          toggleModal(!modalShown);
        }}
      >
        Search Movie
      </button>
      <Modal shown={modalShown} close={() => close()}>
        <div className="searchContainer">
          <div className="searchContainer--flex">
            <p>Search Movies</p>
            <button onClick={close}>Close</button>
          </div>
          <p>Name of the Film</p>
          <form onSubmit={fetchMovies} className="searchBar">
            <input
              type="text"
              placeholder="Search..."
              name="search"
              onInput={(event) => setSearchKey(event.target.value)}
            />
            <button className="submit-search" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
          <ul onClick={() => close()} className="resultsList">
            {renderResults()}
          </ul>
        </div>
      </Modal>
    </>
  );
}
