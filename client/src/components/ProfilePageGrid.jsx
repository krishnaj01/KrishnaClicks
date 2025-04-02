import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { profilePageGridContent } from '../assets/assets.js'

const ProfilePageGrid = () => {
    return (
        <BentoGrid>
            {profilePageGridContent.map((item, i) => (
                <BentoGridItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    header={item.header}
                    image={item.image}
                    className={i === 3 ? "md:col-span-3" : ""}
                    divClassName = {i === 3 ? "md:flex md:items-center md:justify-center" : ""}
                    imageClassName={i==3 ? "hidden sm:block md:w-80" : ""}
                />
            ))}
        </BentoGrid>
    )
}

export default ProfilePageGrid