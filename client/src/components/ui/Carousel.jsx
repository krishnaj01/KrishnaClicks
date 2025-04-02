import React, { useState, useRef, useId, useEffect } from "react";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { formatDate } from '../../utils/index.js';

const Slide = ({ slide, index, current, handleSlideClick }) => {
    const slideRef = useRef(null);
    const xRef = useRef(0);
    const yRef = useRef(0);
    const frameRef = useRef();

    useEffect(() => {
        const animate = () => {
            if (!slideRef.current) return;

            const x = xRef.current;
            const y = yRef.current;

            slideRef.current.style.setProperty("--x", `${x}px`);
            slideRef.current.style.setProperty("--y", `${y}px`);

            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, []);

    const handleMouseMove = (event) => {
        const el = slideRef.current;
        if (!el) return;

        const r = el.getBoundingClientRect();
        xRef.current = event.clientX - (r.left + Math.floor(r.width / 2));
        yRef.current = event.clientY - (r.top + Math.floor(r.height / 2));
    };

    const handleMouseLeave = () => {
        xRef.current = 0;
        yRef.current = 0;
    };

    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    const imageLoaded = (event) => {
        event.currentTarget.style.opacity = "1";
    };

    const { img_url, date } = slide;

    return (
        <div className="perspective-1200 transform-style-preserve-3d">
            <li
                ref={slideRef}
                className={`flex flex-1 flex-col items-center justify-center relative text-center text-white opacity-100 transition-all duration-300 ease-in-out w-[50vmin] h-[50vmin] mx-[2vmin] z-10`}
                onClick={() => handleSlideClick(index)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onContextMenu={handleContextMenu}
                style={{
                    transform:
                        current !== index
                            ? "scale(0.98) rotateX(8deg)"
                            : "scale(1) rotateX(0deg)",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    transformOrigin: "bottom",
                }}>
                <div
                    className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-1% overflow-hidden transition-all duration-150 ease-out"
                    style={{
                        transform:
                            current === index
                                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                                : "none",
                    }}>
                    <img
                        className="absolute inset-0 w-[100%] h-[100%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
                        style={{
                            opacity: current === index ? 1 : 0.5,
                        }}
                        src={img_url}
                        onLoad={imageLoaded}
                        loading="eager"
                        decoding="sync"
                        draggable="false"
                    />
                    <div className="absolute bottom-0 right-0 left-0 text-xs md:text-sm text-gray-100 bg-white/50 px-2 py-1">
                        {formatDate(date)} &nbsp; | &nbsp; Krishna Jhanwar &copy; 2025
                    </div>
                    {current === index && (
                        <div className="absolute inset-0 bg-black/30 transition-all duration-1000" />
                    )}
                </div>
            </li>
        </div>
    );
};

const CarouselControl = ({ type, title, handleClick }) => {
    return (
        <button
            className={`w-10 h-10 flex items-center mx-2 justify-center cursor-pointer bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full focus:border-[#6D64F7] focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${type === "previous" ? "rotate-180" : ""
                }`}
            title={title}
            onClick={handleClick}>
            <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
        </button>
    );
};

const Carousel = ({ slides }) => {
    const [current, setCurrent] = useState(2);

    const handlePreviousClick = () => {
        const previous = current - 1;
        setCurrent(previous < 0 ? slides.length - 1 : previous);
    };

    const handleNextClick = () => {
        const next = current + 1;
        setCurrent(next === slides.length ? 0 : next);
    };

    const handleSlideClick = (index) => {
        if (current !== index) {
            setCurrent(index);
        }
    };

    const id = useId();

    return (
        <div
            className="relative w-[50vmin] h-[50vmin] mx-auto"
            aria-labelledby={`carousel-heading-${id}`}>
            <ul
                className="absolute flex mx-[-2vmin] transition-transform duration-1000 ease-in-out"
                style={{
                    transform: `translateX(-${current * (100 / slides.length)}%)`,
                }}>
                {slides.map((slide, index) => (
                    <Slide
                        key={index}
                        slide={slide}
                        index={index}
                        current={current}
                        handleSlideClick={handleSlideClick}
                    />
                ))}
            </ul>
            <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
                <CarouselControl
                    type="previous"
                    title="Go to previous slide"
                    handleClick={handlePreviousClick}
                />

                <CarouselControl type="next" title="Go to next slide" handleClick={handleNextClick} />
            </div>
        </div>
    );
};

export default Carousel;
