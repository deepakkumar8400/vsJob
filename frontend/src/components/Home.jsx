import React from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from './CategoryCarousel';
import LatestJob from './LatestJob';

function Home() {
  return (
    <>
      <HeroSection />
      <CategoryCarousel />
      <LatestJob />
    </>
  );
}

export default Home;
