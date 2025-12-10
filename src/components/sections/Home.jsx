import React from "react";
import HomeText from "./HomeText";
import HomePic from "./HomePic"; // Globe terrestre
import StarsBackground from "./StarsBackground";
import Footer from "./Footer"; // 🔹 Import Footer
import "./Home.css";

const Home = () => {
  return (
    <>
      <section id="home" className="home">
        <StarsBackground /> {/* Étoiles en arrière-plan */}
        <div className="home-container">
          <div className="home-text">
            <HomeText />
          </div>
          <div className="home-pic">
            <HomePic /> {/* Globe terrestre */}
          </div>
        </div>
      </section>

      {/* 🔹 Footer */}
      <Footer />
    </>
  );
};

export default Home;
