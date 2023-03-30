import React from "react";
import LoginForm from "../components/Login";
import SignupForm from "..components/Signup";

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Home;