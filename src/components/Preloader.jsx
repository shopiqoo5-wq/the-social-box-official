import React from 'react';

const Preloader = ({ tvFading }) => {
  return (
    <div id="preloader">
      <div className="animation-wrapper">
        <img
          id="tv-icon"
          src="/assets/tv-icon.png"
          alt="TV"
          className={`blink-normal${tvFading ? ' fade-out' : ''}`}
        />
      </div>
    </div>
  );
};

export default Preloader;
