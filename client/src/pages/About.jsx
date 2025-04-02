import React from 'react';

import { motion } from "motion/react"

import { FollowerPointerCard } from '../components/ui/FollowingPointer';
import ProfilePageGrid from '../components/ProfilePageGrid';
import { LampContainer } from '../components/ui/Lamp';
import ContactMe from '../components/ContactMe';

import { assets } from '../assets/assets.js';

const About = () => {
  return (
    <main className='flex flex-col lg:flex-row justify-center items-center gap-2 pt-20 pb-52 bg-slate-950'>
      <div className="flex items-center justify-center">
        <div className="max-w-3xl">
          <LampContainer>
            <motion.h1
              className="text-4xl font-bold text-gray-200 mb-4 text-center"
              initial={{ opacity: 0.4, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                ease: "easeInOut",
              }}
            >
              About Me
            </motion.h1>
            <motion.p
              className="z-20 text-lg text-cyan-100 leading-relaxed text-center mb-15"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.6,
                duration: 0.8,
                ease: "easeInOut",
              }}
            >
              Capturing Moments & Crafting Stories
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.6,
                duration: 0.8,
                ease: "easeInOut",
              }}
              className="text-md text-left text-gray-300 leading-relaxed mt-[-1em] mb-8 md:mb-12"
            >
              Hi, I'm Krishna, a passionate photographer who captures stories through diverse genres —
              <br className='hidden sm:block' />from object and nature photography to candid street moments.
            </motion.p>

            <ProfilePageGrid />

            <div className='hidden lg:block'>
              <ContactMe />
            </div>

          </LampContainer>


        </div>
      </div>
      <motion.section
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className='mt-[-2em] sm:mt-[-7em] lg:mt-0 mb-5 md:mb-10 lg:mb-0 flex justify-center items-center gap-10'
      >
        <div className='lg:hidden'>
          <ContactMe />
        </div>
        <section
          className='hidden md:block group overflow-hidden'>
          <FollowerPointerCard title="Krishna Jhanwar">
            <img src={assets.myself} draggable={false} className='w-[30vw] relative group-hover:scale-[1.02] duration-300' alt="myself" />
          </FollowerPointerCard>
          <img src={assets.cloud} alt="cloud" className='absolute w-[35vw] -translate-y-20 lg:-translate-y-45 -translate-x-5 group-hover:scale-105 duration-300' />
        </section>
      </motion.section>

    </main>
  );
};

export default About;
