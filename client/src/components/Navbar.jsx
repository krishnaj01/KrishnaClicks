import React, { useState, useEffect, useRef } from 'react'
import "./Navbar.css"

import { NavLink } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi";

import { assets } from '../assets/assets'

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className='flex items-center justify-evenly h-28 mb-5'>
            <div className='hidden sm:block hover:scale-105 transition-all font-semibold duration-200 text-white text-xl'>
                <NavLink to='/gallery' className={(e) => { return e.isActive ? "nav-link active" : "nav-link" }}>
                    Gallery
                </NavLink>
            </div>

            <NavLink to='/' className='hover:scale-105 transition-all duration-200'>
                <img src={assets.logo} alt="logo" className='w-64 sm:w-80 lg:w-90 invert' />
            </NavLink>

            <div className='hidden sm:block hover:scale-105 transition-all font-semibold duration-200 text-white text-xl'>
                <NavLink to='/about-me' className={(e) => { return e.isActive ? "nav-link active" : "nav-link" }}>
                    About Me
                </NavLink>
            </div>

            <div ref={menuRef} className='sm:hidden relative flex items-center gap-3 cursor-pointer'>
                <GiHamburgerMenu className='text-3xl invert' onClick={() => setShowMenu(!showMenu)} />
                {showMenu && (
                    <div className='absolute top-12 right-0 z-10 text-zinc-300 font-medium rounded-md bg-[#545454d5] border p-2 w-40'>
                        <NavLink to='/gallery'>
                            <p className='cursor-pointer py-1 px-2 mb-1 rounded-md hover:bg-gray-100 hover:scale-[1.02] transition-all duration-100'>Gallery</p>
                        </NavLink>
                        <hr />
                        <NavLink to='/about-me'>
                            <p className='cursor-pointer py-1 px-2 rounded-md hover:bg-gray-100 hover:scale-[1.02] transition-all duration-100'>About Me</p>
                        </NavLink>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
