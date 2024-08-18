import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";

function LandingPage() {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex items-center justify-center min-h-screen">
        <Hero />
      </div>
      <Features />
    </div>
  );
}

export default LandingPage;
