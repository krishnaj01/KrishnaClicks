import React from "react";
import { motion } from "motion/react";
import { WobbleCard } from "./WobbleCard";
import { cn } from "../../lib/utils";

export const BentoGrid = ({ className, children }) => {
    return (
        <motion.div
            className={cn(
                "mx-auto grid max-w-7xl w-full grid-cols-1 gap-2 md:auto-rows-[15rem] md:grid-cols-3",
                className
            )}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: 0.9,
                duration: 0.8,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
};

export const BentoGridItem = ({
    className,
    divClassName,
    imageClassName,
    title,
    description,
    image
}) => {
    return (
        <WobbleCard
            containerClassName={cn("h-70 sm:h-60 bg-cyan-800", className)}
            className="group/bento shadow-input row-span-1 flex flex-col rounded-xl"
        >
            <div className={divClassName}>
                <div>
                    <h2 className="text-left text-balance text-lg font-semibold tracking-[-0.015em] text-white">
                        {title}
                    </h2>
                    <p className="text-left  text-sm text-neutral-200">
                        {description}
                    </p>
                </div>
                <img src={image} alt="" className={imageClassName} />
            </div>

        </WobbleCard>
    );
};
