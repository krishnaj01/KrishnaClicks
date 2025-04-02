import React from "react";
import { motion } from "motion/react";

import ImagesSlider from "./ui/ImagesSlider.jsx";

import { homeHeroImages, homeBackgroundImage } from "../assets/assets.js";

export default function HomeHero() {
  return (
    <ImagesSlider className={`min-h-screen bg-[url(${homeBackgroundImage})] bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${homeBackgroundImage})` }} images={homeHeroImages}>
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="z-50 hidden lg:flex flex-col justify-center items-center">
        <p
          className="font-bold text-xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Step Into My World of Captured Moments
        </p>
        <p className="text-lg md:text-2xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 italic">
          "Every photo I take is a mix of light, perspective, and a little bit of my soul."
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="z-50 lg:hidden flex flex-col justify-center items-center">
        <p
          className="font-bold text-xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Step Into My World of
        </p>
        <p
          className="font-bold mt-[-1.4em] md:mt-[-0.4em] text-xl md:text-5xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          Captured Moments
        </p>
        <p className="text-sm md:text-2xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 italic">
          "Every photo I take is a mix of light, perspective,
        </p>
        <p className="text-sm md:text-2xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 italic">
          and a little bit of my soul."
        </p>
      </motion.div>
    </ImagesSlider>
  );
}
