import React from "react";
import HomeText from "./HomeText";
import HomePic from "./HomePic";
import "./Home.css";

const Home = () => {
  return (
    <section className="home">
      <div className="home-container">
        <div className="home-text">
          <HomeText />
        </div>
        <div className="home-pic">
          <HomePic />
        </div>
      </div>
    </section>
  );
};

export default Home;
