"use client"
import React, { useState } from "react";
import ContentUploader from "./ContentUploader";

function Hero() {
  const [showModal, setShowModal] = useState(false)

  return (
    <section className="py-20 text-center space-y-5 items-center">
      <h1 className="text-8xl font-serif font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
        SmartCards AI
      </h1>
      <p className="max-w-3xl flex text-lg  justify-center text-gray-600 leading-8">
        Transform your study sessions with AI-powered flashcards tailored just
        for you. SmartCards AI adapts to your learning needs, helping you focus
        on what matters most and retain knowledge more effectively.
      </p>
      <button className='bg-green-400 p-3 rounded-lg hover:scale-105 hover:ring-2' onClick={() => setShowModal(true)}>
        Generate Cards
      </button>
      <ContentUploader showModal={showModal} setShowModal={setShowModal}/>
    </section>
  );
}

export default Hero;
