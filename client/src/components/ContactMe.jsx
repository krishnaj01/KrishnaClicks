import React from "react";
import { motion } from "motion/react";

import { FloatingDock } from "./ui/FloatingDock";
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandInstagram,
    IconMail
} from "@tabler/icons-react";

export default function ContactMe() {
    const links = [
        {
            title: "Instagram",
            icon: (
                <IconBrandInstagram className="rotate-270 sm:rotate-0 h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "https://www.instagram.com/krishna.jhanwar01/",
        },
        {
            title: "GitHub",
            icon: (
                <IconBrandGithub className="rotate-270 sm:rotate-0 h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "https://github.com/krishnaj01",
        },
        {
            title: "LinkedIn",
            icon: (
                <IconBrandLinkedin className="rotate-270 sm:rotate-0 h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "https://www.linkedin.com/in/krishna-jhanwar/",
        },
        {
            title: "Mail",
            icon: (
                <IconMail className="rotate-270 sm:rotate-0 h-full w-full text-neutral-500 dark:text-neutral-300" />
            ),
            href: "mailto:krishna.jhanwar2005@gmail.com",
        },
    ];
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                delay: 0,
                duration: 0.8,
                ease: "easeInOut",
            }}
            className="flex flex-col gap-4 items-center justify-center mt-6 sm:mt-8 w-full"
        >
            <p className="lg:hidden text-zinc-200 text-xl md:text-2xl font-medium">Contact Me:</p>
            <FloatingDock
                items={links}
                mobileClassName="-translate-x-33"
            />
        </motion.div>
    );
}
