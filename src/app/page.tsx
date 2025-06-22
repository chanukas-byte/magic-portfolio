'use client';

import React, { useState, useEffect } from "react";
import styles from './HomeButtons.module.css';

import {
  Heading,
  Flex,
  Text,
  Avatar,
  Column,
  Row,
  Meta,
  Schema,
  Button,
  Icon,
} from "@once-ui-system/core";
import { home, about, person, baseURL, social } from "@/resources";
import {
  GitHubProfile,
  GitHubStats,
  GitHubContributionGraph,
  Skills,
  Tools,
} from "@/components";

const roles = [
    "Aspiring Data Engineer",
    "Cloud Architect",
    "ML Solutions Developer",
    "Data Visualizer",
    "Frontend Developer",
    "AI-Driven Data Engineer",
    "Full Stack Developer",
    "Innovating with Data and AI",
];

export default function Home() {
    const [currentRole, setCurrentRole] = useState(person.role);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * roles.length);
            setCurrentRole(roles[randomIndex]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

  return (
    <Column maxWidth="m" gap="xl" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Row
        fillWidth
        paddingY="32"
        gap="m"
        vertical="center"
      >
        <Column flex={2} vertical="center" gap="l">
          <Column gap="m">
            <Heading wrap="balance" variant="display-strong-l" style={{ color: '#8B5CF6' }}>
              {person.name}
            </Heading>
            <Text
              wrap="balance"
              onBackground="brand-strong"
              variant="heading-default-m"
               style={{ height: '60px', transition: 'all 0.5s ease-in-out' }}
            >
              {currentRole}
            </Text>
            <Text onBackground="neutral-medium" variant="body-default-s">
              {person.bio}
            </Text>
          </Column>
          <Flex gap="m" wrap>
            <a
              href="/cv/Chanuka Senevirathne-2.pdf"
              download="Chanuka-Senevirathne-CV.pdf"
              className={`${styles.homeButtons} ${styles.primary}`}
            >
              Download CV
            </a>
            <a
              href={social.find((s) => s.name === "GitHub")?.link}
              target="_blank"
              className={`${styles.homeButtons} ${styles.secondary}`}
            >
              View GitHub
            </a>
          </Flex>
        </Column>
        <Column flex={3} gap="m" paddingRight="s" horizontal="center">
          <Avatar
            src={person.avatar}
            size="xl"
          />
          <Flex gap="m" paddingY="m">
            {social.map((s) => (
              <a href={s.link} target="_blank" key={s.name}>
                <Icon name={s.icon as any} size="l" />
              </a>
            ))}
          </Flex>
        </Column>
      </Row>
      <Column fillWidth horizontal="center">
        <GitHubProfile />
      </Column>
      <Column fillWidth horizontal="center">
        <Skills />
      </Column>
       <Column fillWidth horizontal="center">
        <Tools />
      </Column>
      <Column fillWidth horizontal="center">
        <GitHubContributionGraph />
      </Column>
    </Column>
  );
}
