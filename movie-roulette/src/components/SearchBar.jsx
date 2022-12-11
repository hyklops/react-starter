import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

export default function SearchBar(props) {
  const { searchKey, setSearchKey, fetchMovies, renderResults } = props;
  console.log(searchKey);
  const [modal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal} className="btn-modal">
        Open
      </button>
      {modal && (
        <div className="searchContainer">
          <div onClick={toggleModal} className="overlay"></div>

          <div className="searchContainer--flex">
            <p>Search Movies</p>
            <button onClick={toggleModal} className="x">
              X
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
            <button className="submit-search" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
          <ul className="resultsList">{renderResults()}</ul>
        </div>
      )}
    </>
  );
}
