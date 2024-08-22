import React from "react";
import { features } from "../constants";
import Image from "next/image";

function Features() {
  return (
    <section className="bg-gray-50 w-full py-20">
    <h1 className="text-4xl font-bold text-center mb-10 bg-green-gradient bg-clip-text text-transparent">Features</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
      {features.map((feature, idx) => (
        <div className="flex flex-col items-center text-center bg-white shadow-lg shadow-green-200 rounded-lg p-6 hover:-translate-y-3 transition duration-300" key={idx}>
          <div className="flex justify-center items-center  w-64 mb-4">
            <Image src={feature.image} alt="image" width={100} height={100} className="object-contain scale-125" />
          </div>
          <p className="font-bold text-xl mb-2">{feature.title}</p>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
  );
}

export default Features;
