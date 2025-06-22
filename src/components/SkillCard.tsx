'use client';

import React, { useState, useEffect } from 'react';
import { motion, easeInOut } from 'framer-motion';
import { Card, Text, Column, Flex } from "@once-ui-system/core";

interface Skill {
  title: string;
  description: string;
  images?: Array<{ src: string; alt: string; }>;
}

const descriptions = [
    "Building robust solutions.",
    "Driving innovation forward.",
    "Mastering modern technologies.",
    "Crafting elegant code.",
    "Solving complex problems."
];

export const SkillCard: React.FC<{ skill: Skill; index: number }> = ({ skill, index }) => {
    const [currentDescription, setCurrentDescription] = useState(skill.description);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * (descriptions.length + 1));
            const newDescription = randomIndex < descriptions.length ? descriptions[randomIndex] : skill.description;
            setCurrentDescription(newDescription);
        }, 5000 + Math.random() * 2000);

        return () => clearInterval(interval);
    }, [skill.description]);


    const floatingCardVariants = {
        initial: { y: 0 },
        animate: {
        y: [-8, 8, -8],
        transition: {
            duration: 5,
            repeat: Infinity,
            ease: easeInOut,
            delay: index * 0.2
        }
        },
        hover: {
            scale: 1.1,
            zIndex: 10,
            boxShadow: "0px 10px 30px rgba(139, 92, 246, 0.3)"
        }
    };

    return (
        <motion.div
            key={skill.title}
            variants={floatingCardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
        >
            <Card
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="l"
                padding="l"
                style={{
                    backdropFilter: 'blur(10px)',
                    width: '220px',
                    height: '200px',
                }}
            >
                <Column gap="m" horizontal='center' vertical='center' fillWidth fillHeight>
                    <Flex gap="s">
                        {skill.images && skill.images.map((image) => (
                            <div
                                key={image.alt}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    backgroundImage: `url(${image.src})`,
                                    backgroundSize: 'contain',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'
                                }}
                            />
                        ))}
                    </Flex>
                    <Text variant="heading-default-m" align="center" style={{ color: '#8B5CF6' }}>
                        {skill.title}
                    </Text>
                    <Text variant="body-default-s" align="center" style={{ opacity: 0.8, height: '40px', transition: 'all 0.5s ease-in-out' }}>
                        {currentDescription}
                    </Text>
                </Column>
            </Card>
        </motion.div>
    );
} 