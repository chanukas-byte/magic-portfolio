"use client";

import { FC, useRef } from 'react';
import Link from 'next/link';
import s from '@/app/services/services.module.scss';
import { motion } from 'framer-motion';

const MotionLink = motion(Link);

interface Service {
  slug: string;
  title: string;
  description: string;
}

interface ServicesListProps {
  services: Service[];
}

const ServicesList: FC<ServicesListProps> = ({ services }) => {
  const listRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!listRef.current) return;
    const cards = Array.from(listRef.current.children);
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    }
  };

  return (
    <div className={s.list} ref={listRef} onMouseMove={handleMouseMove}>
      {services.map((service, index) => (
        <MotionLink
          key={service.slug}
          href={`/services/${service.slug}`}
          className={s.service}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -5 }}
        >
          <h2>{service.title}</h2>
          <p>{service.description}</p>
        </MotionLink>
      ))}
    </div>
  );
};

export default ServicesList; 