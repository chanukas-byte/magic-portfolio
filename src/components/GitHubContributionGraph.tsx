'use client';

import { Column, Text, Card } from "@once-ui-system/core";
import GitHubCalendar from 'react-github-calendar';
import { social } from '@/resources';

export const GitHubContributionGraph = () => {
  const githubSocial = social.find((s) => s.name === 'GitHub');
  const username = githubSocial ? githubSocial.link.split('/').pop() : '';

  const colorScale = [
    'var(--color-neutral-alpha-weak)',
    'var(--color-brand-alpha-weak)',
    'var(--color-brand-alpha-medium)',
    'var(--color-brand-alpha-strong)',
    'var(--color-brand-strong)'
  ];

  return (
    <Card
      background="neutral-alpha-weak"
      border="neutral-alpha-medium"
      radius="l"
      padding="xl"
      className="glass-card card-hover"
      style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(45deg, var(--color-brand-strong), var(--color-accent-strong))',
          opacity: 0.05,
          zIndex: 0,
        }}
      />
      <Column gap="m" horizontal="center" paddingY="l" style={{ position: 'relative', zIndex: 1 }}>
        <Text
          variant="heading-default-l"
          align="center"
          className="gradient-text"
          style={{
            marginBottom: '20px',
            fontSize: '1.5rem',
            fontWeight: '600',
          }}
        >
          GitHub Contributions
        </Text>
        <div style={{ width: '100%', maxWidth: '800px', padding: '20px' }}>
          {username && (
            <GitHubCalendar
              username={username}
              colorScheme="dark"
              fontSize={16}
              blockSize={12}
              blockMargin={4}
              hideColorLegend={false}
              hideMonthLabels={false}
              showWeekdayLabels={true}
              labels={{
                totalCount: '{{count}} contributions in the last year'
              }}
            />
          )}
        </div>
      </Column>
    </Card>
  );
}; 