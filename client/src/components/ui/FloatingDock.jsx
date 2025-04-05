/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { useRef, useState } from "react";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({ items, className }) => {
    return (
        <div className={`relative ml-6 block md:hidden ${className} rotate-90`}>
            <AnimatePresence>
                <motion.div
                    layoutId="nav"
                    className="absolute bottom-full mb-4 inset-x-0 flex flex-col gap-4">
                    {items.map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{
                                opacity: 0,
                                y: 10,
                                transition: {
                                    delay: idx * 0.05,
                                },
                            }}
                            transition={{ delay: (items.length - 1 - idx) * 0.05 }}>
                            <a href={item.href} key={item.title} target="_blank" className="relative h-10 w-10 rounded-full bg-cyan-700 flex items-center justify-center">
                                <Noise1 />
                                <div className="h-5 w-5">
                                    {item.icon}
                                </div>
                            </a>
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const FloatingDockDesktop = ({ items, className }) => {
    let mouseX = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="mx-auto hidden md:block bg-cyan-800 rounded-2xl"
        >
            <div className={`relative md:flex h-16 gap-4 items-end [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] px-4 pb-3 sm:rounded-2xl ${className}`}>
                <Noise />
                {items.map((item) => (
                    <IconContainer mouseX={mouseX} key={item.title} {...item} />
                ))}
            </div>
        </motion.div>
    );
};

function IconContainer({ mouseX, title, icon, href }) {
    let ref = useRef(null);

    let distance = useTransform(mouseX, (val) => {
        let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    let heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

    let width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    let widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });
    let heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <a href={href} target="_blank">
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="aspect-square rounded-full bg-[rgba(255,255,255,0.2)] flex items-center justify-center relative">
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="px-2 py-0.5 whitespace-pre rounded-md bg-[rgba(255,255,255,0.5)] text-gray-200 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs">
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className="flex items-center justify-center">
                    {icon}
                </motion.div>
            </motion.div>
        </a>
    );
}


const Noise = () => {
    return (
        <div
            className="absolute inset-0 w-full h-full rounded-2xl transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
            style={{
                backgroundImage: "url(../src/assets/noise.webp)",
                backgroundSize: "30%",
            }}
        ></div>
    );
};

const Noise1 = () => {
    return (
        <div
            className="absolute inset-0 w-full h-full rounded-full transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
            style={{
                backgroundImage: "url(../src/assets/noise.webp)",
                backgroundSize: "30%",
            }}
        ></div>
    );
};