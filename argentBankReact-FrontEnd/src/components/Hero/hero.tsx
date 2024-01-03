import "./hero.scss";

import React from "react";

const Hero: React.FC = () => {
  return (
    <div className="hero">
      <section className="hero-content">
        {/* <h2 className="sr-only">Promoted Content</h2> */}
        <ul>
          <li className="subtitle">No fees.</li>
          <li className="subtitle">No minimum deposit.</li>
          <li className="subtitle">High interest rates.</li>
        </ul>
        <p className="text">Open a savings account with Argent Bank today!</p>
      </section>
    </div>
  );
};

export default Hero;
