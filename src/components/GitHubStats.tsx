"use client";

import {
  Card,
  Column,
  Flex,
  Heading,
  Text,
  Badge,
} from '@once-ui-system/core';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { social } from '@/resources';

interface Repository {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

interface LanguageStats {
  name: string;
  percentage: number;
  color: string;
}

export const GitHubStats = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [languageStats, setLanguageStats] = useState<LanguageStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const githubSocial = social.find((s) => s.name === 'GitHub');
  const username = githubSocial ? githubSocial.link.split('/').pop() : '';

  useEffect(() => {
    const fetchRepositories = async () => {
      if (!username) {
        setError('GitHub username not found in content.js');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=stars&per_page=3`,
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error('Invalid response format from GitHub API');
        }

        const validRepos = data.filter(
          (repo): repo is Repository =>
            typeof repo === 'object' &&
            repo !== null &&
            typeof repo.name === 'string' &&
            typeof repo.html_url === 'string',
        );

        setRepositories(validRepos);

        const languages = validRepos.reduce(
          (acc: { [key: string]: number }, repo: Repository) => {
            if (repo.language) {
              acc[repo.language] = (acc[repo.language] || 0) + 1;
            }
            return acc;
          },
          {},
        );

        const total = Object.values(languages).reduce(
          (a: number, b: number) => a + b,
          0,
        );
        const stats = Object.entries(languages).map(([name, count]) => ({
          name,
          percentage: Math.round(((count as number) / total) * 100),
          color: getLanguageColor(name),
        }));

        setLanguageStats(stats);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setError(
          error instanceof Error ? error.message : 'Failed to fetch GitHub data',
        );
        setRepositories([]);
        setLanguageStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username]);

  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      Python: '#3572A5',
      TypeScript: '#2b7489',
      JavaScript: '#f1e05a',
      Java: '#b07219',
      'C++': '#f34b7d',
      R: '#198CE7',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      PHP: '#4F5D95',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      Scala: '#c22d40',
      Shell: '#89e051',
      PowerShell: '#012456',
      'C#': '#178600',
      C: '#555555',
      'Objective-C': '#438eff',
      Dart: '#00B4AB',
      Elixir: '#6e4a7e',
      Clojure: '#db5855',
      Haskell: '#5e5086',
      Lua: '#000080',
      Perl: '#0298c3',
      Roff: '#ecdebe',
      TeX: '#3D6117',
      'Vim script': '#199f4b',
      Assembly: '#6E4C13',
      Batchfile: '#C1F12E',
      Dockerfile: '#384d54',
      Makefile: '#427819',
      CMake: '#DA3434',
      Groovy: '#e69f56',
      'Jupyter Notebook': '#DA5B0B',
      MATLAB: '#e16737',
      Pascal: '#E3F171',
      PLpgSQL: '#336790',
      PostScript: '#da291c',
      Prolog: '#74283c',
      PureScript: '#1D222D',
      QML: '#44a51c',
      Racket: '#3c5caa',
      Reason: '#ff5847',
      SAS: '#B34936',
      Solidity: '#AA6746',
      Starlark: '#76d275',
      Tcl: '#e4cc98',
      Vue: '#41b883',
      WebAssembly: '#04133b',
      XSLT: '#EB8CEB',
      Yacc: '#4B6C4B',
      Zig: '#ec915c',
      Zsh: '#89e051',
    };

    return colors[language] || '#8B5CF6';
  };

  if (loading) {
    return (
      <Card
        background="neutral-alpha-weak"
        border="neutral-alpha-medium"
        radius="l"
        padding="xl"
        style={{
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)',
        }}
      >
        <Text variant="body-default-m" style={{ color: '#8B5CF6' }}>
          Loading GitHub data...
        </Text>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        background="neutral-alpha-weak"
        border="neutral-alpha-medium"
        radius="l"
        padding="xl"
        style={{
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)',
        }}
      >
        <Text variant="body-default-m" style={{ color: '#8B5CF6' }}>
          Error: {error}
        </Text>
      </Card>
    );
  }

  if (repositories.length === 0) {
    return (
      <Card
        background="neutral-alpha-weak"
        border="neutral-alpha-medium"
        radius="l"
        padding="xl"
        style={{
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)',
        }}
      >
        <Text variant="body-default-m" style={{ color: '#8B5CF6' }}>
          No repositories found.
        </Text>
      </Card>
    );
  }

  return (
    <Column gap="l" style={{ width: '100%' }}>
      {/* Top Repositories */}
      <Card
        background="neutral-alpha-weak"
        border="neutral-alpha-medium"
        radius="l"
        padding="xl"
        style={{
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)',
        }}
      >
        <Column gap="m">
          <Heading variant="heading-strong-m" style={{ color: '#8B5CF6' }}>
            Top Repositories
          </Heading>
          <Flex gap="m" direction="column">
            {repositories.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ textDecoration: 'none' }}
                whileHover={{ y: -2 }}
              >
                <Card
                  background="brand-alpha-weak"
                  border="brand-alpha-medium"
                  radius="m"
                  padding="m"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <Heading
                    variant="heading-strong-s"
                    style={{ color: '#A78BFA' }}
                  >
                    {repo.name}
                  </Heading>
                  <Text
                    variant="body-default-s"
                    style={{ color: '#D1C4E9', minHeight: '3em' }}
                  >
                    {repo.description}
                  </Text>
                  <Flex horizontal="space-between" vertical="center">
                    <Badge
                      background="neutral-alpha-weak"
                      onBackground="neutral-strong"
                      textVariant="label-default-s"
                      arrow={false}
                    >
                      <Flex gap="4" align="center">
                        <span
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: getLanguageColor(repo.language),
                          }}
                        />
                        {repo.language}
                      </Flex>
                    </Badge>
                    <Flex gap="m" align="center">
                      <Text
                        variant="body-default-s"
                        style={{ color: '#D1C4E9' }}
                      >
                        ⭐️ {repo.stargazers_count}
                      </Text>
                      <Text
                        variant="body-default-s"
                        style={{ color: '#D1C4E9' }}
                      >
                        🍴 {repo.forks_count}
                      </Text>
                    </Flex>
                  </Flex>
                </Card>
              </motion.a>
            ))}
          </Flex>
        </Column>
      </Card>

      {/* Language Statistics */}
      <Card
        background="neutral-alpha-weak"
        border="neutral-alpha-medium"
        radius="l"
        padding="xl"
        style={{
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(139, 92, 246, 0.1)',
        }}
      >
        <Column gap="m">
          <Heading variant="heading-strong-m" style={{ color: '#8B5CF6' }}>
            Top Languages
          </Heading>
          <Column gap="s">
            {languageStats.map((lang) => (
              <Flex key={lang.name} align="center" gap="m">
                <Text
                  variant="body-default-s"
                  style={{ color: '#D1C4E9', width: '120px' }}
                >
                  {lang.name}
                </Text>
                <Flex
                  style={{
                    flex: 1,
                    height: '8px',
                    backgroundColor: '#3730A3',
                    borderRadius: '4px',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    style={{
                      width: `${lang.percentage}%`,
                      height: '100%',
                      backgroundColor: lang.color,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${lang.percentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </Flex>
                <Text
                  variant="body-default-s"
                  style={{ color: '#D1C4E9', width: '40px', textAlign: 'right' }}
                >
                  {lang.percentage}%
                </Text>
              </Flex>
            ))}
          </Column>
        </Column>
      </Card>
    </Column>
  );
}; 