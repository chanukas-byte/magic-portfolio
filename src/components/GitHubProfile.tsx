'use client';

import React, { useEffect, useState } from 'react';
import { motion, easeInOut } from 'framer-motion';
import { Card, Text, Column, Flex, Badge } from "@once-ui-system/core";
import { social } from '@/resources';

interface GitHubData {
  languages: { [key: string]: number };
  topRepos: Array<{
    name: string;
    description: string;
    language: string;
    stars: number;
  }>;
}

export const GitHubProfile = () => {
  const [githubData, setGithubData] = useState<GitHubData>({
    languages: {},
    topRepos: []
  });

  const githubSocial = social.find((s) => s.name === 'GitHub');
  const username = githubSocial ? githubSocial.link.split('/').pop() : '';

  useEffect(() => {
    const fetchGitHubData = async () => {
      if (!username) return;
      try {
        // Fetch user's repositories
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await reposResponse.json();

        // Process languages and repositories
        const languages: { [key: string]: number } = {};
        const topRepos = await Promise.all(
          repos
            .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
            .slice(0, 3)
            .map(async (repo: any) => {
              const langResponse = await fetch(repo.languages_url);
              const repoLanguages = await langResponse.json();
              
              // Update language counts
              Object.entries(repoLanguages).forEach(([lang, count]: [string, any]) => {
                languages[lang] = (languages[lang] || 0) + count;
              });

              return {
                name: repo.name,
                description: repo.description || 'No description available',
                language: Object.keys(repoLanguages)[0] || 'Unknown',
                stars: repo.stargazers_count
              };
            })
        );

        setGithubData({ languages, topRepos });
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchGitHubData();
  }, [username]);

  const floatingCardVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: easeInOut
      }
    }
  };

  return (
    <Column gap="32" style={{ width: '100%' }}>
      {/* Languages Section */}
      <Column gap="24">
        <Text variant="heading-default-l" style={{
          background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Programming Languages
        </Text>
        <Flex gap="16" wrap={true}>
          {Object.entries(githubData.languages)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 8)
            .map(([lang, count], index) => (
              <motion.div
                key={lang}
                variants={floatingCardVariants}
                initial="initial"
                animate="animate"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Card
                  background="neutral-alpha-weak"
                  border="neutral-alpha-medium"
                  radius="l"
                  padding="l"
                  style={{
                    backdropFilter: 'blur(10px)',
                    minWidth: '150px',
                  }}
                >
                  <Column gap="s" horizontal="center">
                    <Text variant="heading-default-m" align="center">
                      {lang}
                    </Text>
                    <Badge
                      background="brand-alpha-weak"
                      paddingX="12"
                      paddingY="4"
                      onBackground="neutral-strong"
                    >
                      {Math.round((count / Object.values(githubData.languages).reduce((a, b) => a + b, 0)) * 100)}%
                    </Badge>
                  </Column>
                </Card>
              </motion.div>
            ))}
        </Flex>
      </Column>

      {/* Top Repositories Section */}
      <Column gap="24">
        <Text variant="heading-default-l" style={{
          background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Top Repositories
        </Text>
        <Flex gap="24" wrap={true}>
          {githubData.topRepos.map((repo, index) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card
                background="neutral-alpha-weak"
                border="neutral-alpha-medium"
                radius="l"
                padding="l"
                style={{
                  backdropFilter: 'blur(10px)',
                  width: '300px',
                }}
              >
                <Column gap="m">
                  <Text variant="heading-default-m">
                    {repo.name}
                  </Text>
                  <Text variant="body-default-s" style={{ opacity: 0.8 }}>
                    {repo.description}
                  </Text>
                  <Flex gap="m" vertical="center">
                    <Badge
                      background="brand-alpha-weak"
                      paddingX="12"
                      paddingY="4"
                      onBackground="neutral-strong"
                    >
                      {repo.language}
                    </Badge>
                    <Text variant="body-default-s" style={{ opacity: 0.8 }}>
                      ⭐ {repo.stars} stars
                    </Text>
                  </Flex>
                </Column>
              </Card>
            </motion.div>
          ))}
        </Flex>
      </Column>
    </Column>
  );
}; 