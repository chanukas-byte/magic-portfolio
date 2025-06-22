'use client';
import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import styles from "./about.module.scss";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';

export default function About() {
  const [typedName, setTypedName] = useState('');
  const roles = person.role.split("|").map(r => r.trim());
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  // Typewriter effect for name
  useEffect(() => {
    if (typedName.length < person.name.length) {
      const timeoutId = setTimeout(() => {
        setTypedName(person.name.slice(0, typedName.length + 1));
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [typedName, person.name]);

  // Cycling effect for roles
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentRoleIndex(prevIndex => (prevIndex + 1) % roles.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [roles.length]);

  return (
    <Column maxWidth="m" className={styles.aboutPage}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Flex direction="column" align="center" justify="center" className={styles.header}>
        {about.avatar.display && (
          <>
            <Avatar src={person.avatar} size="xl" className={styles.avatar} />
            <Flex gap="8" vertical="center" className={styles.info}>
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8" className={styles.tags}>
                {person.languages.map((language) => (
                  <Tag key={language} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
            <Heading variant="display-strong-xl" className={styles.name}>{typedName}</Heading>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRoleIndex}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className={styles.roleContainer}
              >
                <Text variant="display-default-xs" onBackground="neutral-weak" className={styles.role}>
                  {roles[currentRoleIndex]}
                </Text>
              </motion.div>
            </AnimatePresence>
            {social.length > 0 && (
              <Flex gap="8" wrap horizontal="center" fitWidth data-border="rounded" className={styles.socials}>
                {social.map((item) =>
                  item.link && (
                    <React.Fragment key={item.name}>
                      <Button
                        className="s-flex-hide"
                        href={item.link}
                        prefixIcon={item.icon}
                        label={item.name}
                        size="s"
                        weight="default"
                        variant="secondary"
                      />
                      <IconButton
                        className="s-flex-show"
                        size="l"
                        href={item.link}
                        icon={item.icon}
                        variant="secondary"
                      />
                    </React.Fragment>
                  )
                )}
              </Flex>
            )}
          </>
        )}
      </Flex>

      <div className={styles.journeySection}>
        <Heading as="h2" variant="display-strong-s" className={styles.journeyTitle}>
          My Journey
        </Heading>
        <div className={styles.timeline}>
          {about.timeline.map((item, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <div key={item.title + idx} className={`${styles.timelineNode} ${isLeft ? styles.left : styles.right}`}>
                <div className={styles.timelineCard} style={{ borderImageSource: item.color }}>
                  <div className={styles.timelineIcon} style={{ background: item.color }}>
                    <Icon name={item.icon as any} />
                  </div>
                  <Text variant="heading-strong-l" className={styles.cardTitle}>{item.title}</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak" className={styles.cardDate}>{item.date}</Text>
                  <div className={styles.cardDetails}>{item.details}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Column>
  );
}
