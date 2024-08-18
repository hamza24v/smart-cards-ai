import React from "react";
import { features } from "../constants";
import Image from "next/image";

function Features() {
  return (
    <section className="bg-gray-100 w-full py-20">
      <h2 className="text-4xl font-bold text-center mb-10">Features</h2>
      <div className="flex flex-row gap-4 justify-center">
        {features.map((feature) => (
          <div className="flex p-4 flex-col text-center justify-center  bg-gray-100 shadow-lg rounded-lg transition ease-in-out delay-150 hover:scale-105 hover:-translate-y-1">
            <Image src={feature.image} alt="image" width={50} height={50} />
            <p className="font-bold text-xl mb-5">{feature.title}</p>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
