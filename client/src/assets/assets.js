import logo from './logo-svg.svg'
import image404 from './404image.png'
import camera from './camera.png'
import editing_logos from './editing_logos.png'
import car from './car.png'
import journey from './journey.png'
import cloud from './cloud.png'
import myself from './myself.jpg'
import no_images from './no-images.png'

export const assets = {
    logo,
    image404,
    myself,
    cloud,
    no_images,
}

export const homeHeroImages = import.meta.env.VITE_HOME_HERO_IMAGE_ARRAY.split(',');

export const homeBackgroundImage = import.meta.env.VITE_HOME_BACKGROUND_IMAGE;

export const profilePageGridContent = [
    {
        title: "My Gear",
        description: "I primarily use my phone for vibrant shots and occasionally experiment with TPS cameras for better techniques.",
        image: camera,
    },
    {
        title: "Editing Enthusiast",
        description: "Photography doesn't end with capturing the shot—I love editing photos to enhance colors, contrasts, and light, transforming moments into striking images with fine-tuned details and a creative touch.",
        image: editing_logos,
    },
    {
        title: "What Drives Me",
        description: "For me, photography is about capturing unnoticed emotions and moments — whether it's an object, nature's serenity, or life's pulse on the streets.",
        image: car,
    },
    {
        title: "My Journey",
        description: "As a core member of The Pixel Snappers (TPS), IIT Bhilai, I've explored diverse photography styles — from street and nature photography to portrait and event coverage. My curiosity and dedication have driven me to experiment with unique perspectives and editing techniques, always seeking to refine my craft. Being part of TPS has helped me hone my skills, experiment with different styles, and deepen my love for photography.",
        image: journey,
    }
]