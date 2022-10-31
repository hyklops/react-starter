import React from "react";
import Card from "./components/Card";
import data from "./data";
import Nav from "./components/Nav";
import "./App.css";

export default function App() {
  const cards = data.map((item) => {
    return <Card key={item.id} {...item} />;
  });

  return (
    <div className="container">
      <Nav />
      <section className="cards-list">{cards}</section>
    </div>
  );
}
