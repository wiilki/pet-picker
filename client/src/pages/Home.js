import React from "react";
import SearchForm from "../components/SearchForm"

const Home = () => {
  return (
    <div className="container">
      <h1>Pet Pickers</h1>
      <h2>Find your next pet here!</h2>
      <SearchForm />
    </div>
  );
};

export default Home;
