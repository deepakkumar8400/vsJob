import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJob from "./LatestJob";

function Home() {
  const { user } = useSelector((store) => store.auth); // Corrected: useSelector
  const navigate = useNavigate(); // Corrected: useNavigate

  // Redirect recruiter to admin/companies
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies"); // Corrected: navigate
    }
  }, [user, navigate]);

  return (
    <>
      <HeroSection />
      <CategoryCarousel />
      <LatestJob />
    </>
  );
}

export default Home;