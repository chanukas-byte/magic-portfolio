'use client';

import React from 'react';
import { Flex, Text } from '@once-ui-system/core';
import styles from './ColorfulAnimatedSection.module.scss';

const phrases = [
  "Building Scalable Data Pipelines",
  "Innovating with AI & Machine Learning",
  "Architecting Cloud-Native Solutions",
  "Driving Data-Driven Decisions"
];

export const ColorfulAnimatedSection: React.FC = () => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000); // Change phrase every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Flex horizontal="center" paddingY="32" className={styles.animatedSection}>
      <Text
        variant="heading-default-xl"
        onBackground="neutral-strong"
        className={styles.animatedText}
        dangerouslySetInnerHTML={{ __html: phrases[currentPhraseIndex] }}
      />
    </Flex>
  );
}; 