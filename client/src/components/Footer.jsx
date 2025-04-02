import React from 'react'
import "./Footer.css"

import { FaSquareInstagram, FaLinkedin } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FiPhone } from "react-icons/fi";

import { assets } from '../assets/assets.js'

const Footer = () => {
    return (
        <footer className='pb-3'>
            <div className='flex justify-evenly text-center mb-7 text-white'>
                {/* Div 1: Visible on all screen sizes */}
                <div className='flex flex-col items-center justify-center mt-10 gap-1'>
                    <img src={assets.logo} alt="logo-text" className='w-72 sm:w-90 invert' />
                    <p className='ml-4 sm:ml-10 text-sm text-gray-300 pt-1'>&copy; 2025 KrishnaClicks. All Rights Reserved.</p>
                </div>


                {/* Div 3: Visible on medium and larger screens (md:grid-cols-2 and lg:grid-cols-3) */}
                <div className='hidden md:flex flex-col gap-1 mt-10'>
                    <h2 className='text-2xl font-medium mb-5 flex justify-center items-center'>
                        <FiPhone className='inline-block mr-2' />
                        Contact Me
                    </h2>
                    <div className='flex gap-3 items-center justify-center text-4xl'>
                        <a href='https://www.instagram.com/krishna.jhanwar01/' target="_blank" className='border p-2 rounded-full border-zinc-300'>
                            <FaSquareInstagram className='p-1 hover:p-0.5' />
                        </a>
                        <a href='https://github.com/krishnaj01' target="_blank" className='border p-2 rounded-full border-zinc-300'>
                            <FaGithubSquare className='p-1 hover:p-0.5' />
                        </a>
                        <a href='https://www.linkedin.com/in/krishna-jhanwar/' target="_blank" className='border p-2 rounded-full border-zinc-300'>
                            <FaLinkedin className='p-1 hover:p-0.5' />
                        </a>
                        <a href='mailto:krishna.jhanwar2005@gmail.com' target="_blank" className='border p-2 rounded-full border-zinc-300'>
                            <IoIosMail className='p-0.5 hover:p-0' />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer