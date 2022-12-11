import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

export default function SearchBar() {
  return (
    <div>
      <form className="example" action="action_page.php">
        <input type="text" placeholder="Search..." name="search" />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
      </form>
    </div>
  );
}
