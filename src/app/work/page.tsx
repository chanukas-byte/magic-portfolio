'use client';
import { Column, Schema } from "@once-ui-system/core";
import { baseURL, about, person, work } from "@/resources";
import React, { useEffect, useState } from 'react';
import { Card, Flex, Badge, Text, Tooltip, Icon, Button } from "@once-ui-system/core";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// Type definitions
interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  created_at: string;
  private: boolean;
  owner: {
    login: string;
  };
}

// Enhanced repository image function with fallbacks
function getRepoImage(repo: Repository): string {
  // Try GitHub Open Graph image first
  if (repo.owner && repo.name) {
    return `https://opengraph.githubassets.com/${repo.id}/${repo.owner.login}/${repo.name}`;
  }
  
  // Fallback to language-based placeholder
  const languageColors: Record<string, string> = {
    'JavaScript': '#F7DF1E',
    'TypeScript': '#3178C6',
    'Python': '#3776AB',
    'React': '#61DAFB',
    'Vue': '#4FC08D',
    'Node.js': '#339933',
    'Java': '#ED8B00',
    'C++': '#00599C',
    'C#': '#239120',
    'Go': '#00ADD8',
    'Rust': '#DEA584',
    'PHP': '#777BB4',
    'Ruby': '#CC342D',
    'Swift': '#FA7343',
    'Kotlin': '#7F52FF',
    'Dart': '#00D4AA',
    'R': '#276DC3',
    'Scala': '#DC322F',
    'Elixir': '#4B275F',
    'Clojure': '#5881D8'
  };
  
  const color = languageColors[repo.language || ''] || '#8B5CF6';
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:${color};stop-opacity:0.4" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="24" font-weight="bold" text-anchor="middle" fill="white">${repo.name}</text>
      <text x="50%" y="65%" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="white" opacity="0.8">${repo.language || 'Code'}</text>
      <circle cx="80%" cy="20%" r="8" fill="white" opacity="0.3"/>
      <circle cx="85%" cy="25%" r="4" fill="white" opacity="0.2"/>
      <circle cx="75%" cy="30%" r="6" fill="white" opacity="0.4"/>
    </svg>
  `)}`;
}

// Animated background component
const AnimatedBackground = () => (
  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: -1 }}>
    <motion.div
      style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '10%',
        left: '10%',
      }}
      animate={{
        x: [0, 100, 0],
        y: [0, -50, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <motion.div
      style={{
        position: 'absolute',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '60%',
        right: '15%',
      }}
      animate={{
        x: [0, -80, 0],
        y: [0, 30, 0],
        scale: [1, 0.8, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2
      }}
    />
  </div>
);

// Tab component
interface TabProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: string;
}

const Tab: React.FC<TabProps> = ({ active, onClick, children, icon }) => (
  <motion.button
    onClick={onClick}
    style={{
      padding: '12px 24px',
      border: 'none',
      background: active ? 'linear-gradient(135deg, #8B5CF6, #3B82F6)' : 'transparent',
      color: active ? 'white' : '#6B7280',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: active ? 600 : 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    {icon && <Icon name={icon} size="s" />}
    {children}
    {active && (
      <motion.div
        layoutId="activeTab"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'white',
          borderRadius: '1px'
        }}
        initial={false}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    )}
  </motion.button>
);

function GithubProjectsGrid() {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');
  const [activeTab, setActiveTab] = useState('all');

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('https://api.github.com/users/chanukas-byte/repos?sort=updated&per_page=50')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch repos');
        return res.json();
      })
      .then(data => setRepos(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const cardVariants = {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    whileHover: { 
      scale: 1.02, 
      y: -8,
      boxShadow: '0 20px 40px rgba(139,92,246,0.15)'
    },
    whileTap: { scale: 0.98 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Filter and sort repositories
  const filteredAndSortedRepos = repos
    .filter(repo => {
      if (filter === 'all') return true;
      if (filter === 'featured') return repo.stargazers_count > 0;
      if (filter === 'recent') {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return new Date(repo.updated_at) > thirtyDaysAgo;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'updated') return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      if (sortBy === 'stars') return b.stargazers_count - a.stargazers_count;
      if (sortBy === 'forks') return b.forks_count - a.forks_count;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });

  // Skeleton loader with improved animation
  const SkeletonCard = ({ index }: { index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card 
        background="neutral-alpha-weak" 
        border="neutral-alpha-medium" 
        radius="l" 
        padding="l" 
        style={{ 
          minHeight: 280, 
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <motion.div
          style={{
            width: '100%',
            height: 140,
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            borderRadius: 12,
            marginBottom: 16,
            backgroundSize: '200% 100%'
          }}
          animate={{
            backgroundPosition: ['200% 0', '-200% 0']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#8B5CF6', opacity: 0.3 }} />
            <div style={{ width: '60%', height: 20, background: '#8B5CF6', opacity: 0.2, borderRadius: 4 }} />
          </div>
          <div style={{ width: '90%', height: 16, background: '#8B5CF6', opacity: 0.15, borderRadius: 4 }} />
          <div style={{ width: '70%', height: 16, background: '#8B5CF6', opacity: 0.15, borderRadius: 4 }} />
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ width: 60, height: 24, background: '#8B5CF6', opacity: 0.1, borderRadius: 12 }} />
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  const tabs = [
    { id: 'all', label: 'All Projects', icon: 'grid' },
    { id: 'featured', label: 'Featured', icon: 'star' },
    { id: 'recent', label: 'Recent', icon: 'clock' },
    { id: 'web', label: 'Web Apps', icon: 'globe' },
    { id: 'mobile', label: 'Mobile', icon: 'smartphone' },
    { id: 'ai', label: 'AI/ML', icon: 'brain' }
  ];

  return (
    <div style={{ margin: '32px auto', maxWidth: 1200, width: '100%', position: 'relative' }}>
      <AnimatedBackground />
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 48 }}
      >
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 700, 
          background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 16
        }}>
          My Projects
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#6B7280', 
          maxWidth: 600, 
          margin: '0 auto',
          lineHeight: 1.6
        }}>
          Explore my latest work and contributions to open source projects
        </p>
      </motion.div>

      {/* Tabs Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 8, 
          marginBottom: 32,
          flexWrap: 'wrap',
          padding: '0 16px'
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            icon={tab.icon}
          >
            {tab.label}
          </Tab>
        ))}
      </motion.div>

      {/* Filters and Sorting */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 16, 
          marginBottom: 32,
          flexWrap: 'wrap'
        }}
      >
        {['all', 'featured', 'recent'].map(filterType => (
          <Button
            key={filterType}
            variant={filter === filterType ? 'primary' : 'secondary'}
            size="s"
            onClick={() => setFilter(filterType)}
            style={{ textTransform: 'capitalize' }}
          >
            {filterType}
          </Button>
        ))}
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '8px 16px',
            borderRadius: 8,
            border: '1px solid #D1D5DB',
            background: 'white',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <option value="updated">Recently Updated</option>
          <option value="stars">Most Stars</option>
          <option value="forks">Most Forks</option>
          <option value="name">Name A-Z</option>
        </select>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            width: '100%',
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} index={i} />
          ))}
        </motion.div>
      )}

      {/* Error State */}
      {!loading && error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ textAlign: 'center', padding: '60px 20px' }}
        >
          <Icon name="alert" size="l" style={{ color: '#EF4444', marginBottom: 16 }} />
          <Text variant="body-default-l" style={{ color: '#EF4444', marginBottom: 8 }}>
            Error: {error}
          </Text>
          <Button 
            variant="secondary" 
            onClick={() => window.location.reload()}
            style={{ marginTop: 16 }}
          >
            Try Again
          </Button>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && !error && filteredAndSortedRepos.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', padding: '60px 20px' }}
        >
          <Icon name="github" size="l" style={{ color: '#8B5CF6', marginBottom: 16 }} />
          <Text variant="body-default-l" style={{ color: '#6B7280' }}>
            No repositories found matching your criteria.
          </Text>
        </motion.div>
      )}

      {/* Repository Grid */}
      {!loading && !error && filteredAndSortedRepos.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            width: '100%',
          }}
        >
          <AnimatePresence>
            {filteredAndSortedRepos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, y: 30, scale: 0.9 }}
                whileHover="whileHover"
                whileTap="whileTap"
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <Card
                  background="surface"
                  border="neutral-alpha-medium"
                  radius="l"
                  padding="l"
                  style={{
                    minHeight: 280,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '16px',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {/* Repository Image */}
                  <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 12 }}>
                    <motion.img
                      src={getRepoImage(repo)}
                      alt={repo.name + ' preview'}
                      style={{
                        width: '100%',
                        height: 140,
                        objectFit: 'cover',
                        borderRadius: 12,
                      }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      onError={e => { 
                        e.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(`
                          <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
                            <rect width="100%" height="100%" fill="#8B5CF6"/>
                            <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="white" dy=".3em">${repo.name}</text>
                          </svg>
                        `)}`;
                      }}
                    />
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        padding: '4px 8px',
                        borderRadius: 6,
                        fontSize: '12px',
                        fontWeight: 500
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {repo.private ? 'Private' : 'Public'}
                    </motion.div>
                  </div>

                  {/* Repository Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Flex align="center" gap="s">
                      <Icon name="github" size="s" style={{ color: '#8B5CF6' }} />
                      <Text 
                        variant="heading-default-m" 
                        style={{ 
                          color: '#1F2937', 
                          fontWeight: 600, 
                          flex: 1, 
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap' 
                        }}
                      >
                        {repo.name}
                      </Text>
                    </Flex>

                    <Tooltip content={repo.description || 'No description'} label="Repository description">
                      <Text 
                        variant="body-default-s" 
                        style={{ 
                          color: '#6B7280', 
                          lineHeight: 1.5,
                          minHeight: 40,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical'
                        }}
                      >
                        {repo.description || 'No description available'}
                      </Text>
                    </Tooltip>

                    {/* Stats and Badges */}
                    <Flex gap="s" align="center" wrap style={{ marginTop: 'auto' }}>
                      {repo.language && (
                        <Badge 
                          background="brand-alpha-weak" 
                          paddingX="8" 
                          paddingY="2" 
                          onBackground="neutral-strong"
                          style={{ fontSize: '12px' }}
                        >
                          {repo.language}
                        </Badge>
                      )}
                      <Badge 
                        background="neutral-alpha-weak" 
                        paddingX="8" 
                        paddingY="2" 
                        onBackground="neutral-strong"
                        style={{ fontSize: '12px' }}
                      >
                        ⭐ {repo.stargazers_count}
                      </Badge>
                      <Badge 
                        background="neutral-alpha-weak" 
                        paddingX="8" 
                        paddingY="2" 
                        onBackground="neutral-strong"
                        style={{ fontSize: '12px' }}
                      >
                        🔄 {repo.forks_count}
                      </Badge>
                      <Tooltip content={repo.updated_at ? new Date(repo.updated_at).toLocaleString() : ''} label="Last updated">
                        <Badge 
                          background="neutral-alpha-weak" 
                          paddingX="8" 
                          paddingY="2" 
                          onBackground="neutral-strong"
                          style={{ fontSize: '12px' }}
                        >
                          {repo.updated_at ? new Date(repo.updated_at).toLocaleDateString() : ''}
                        </Badge>
                      </Tooltip>
                    </Flex>
                  </div>
                </Card>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Stats Summary */}
      {!loading && !error && repos.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
            marginTop: 48,
            padding: '24px',
            background: 'linear-gradient(135deg, rgba(139,92,246,0.05), rgba(59,130,246,0.05))',
            borderRadius: 16,
            flexWrap: 'wrap'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <Text variant="heading-strong-l" style={{ color: '#8B5CF6' }}>
              {repos.length}
            </Text>
            <Text variant="body-default-s" style={{ color: '#6B7280' }}>
              Total Repositories
            </Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Text variant="heading-strong-l" style={{ color: '#8B5CF6' }}>
              {repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
            </Text>
            <Text variant="body-default-s" style={{ color: '#6B7280' }}>
              Total Stars
            </Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Text variant="heading-strong-l" style={{ color: '#8B5CF6' }}>
              {repos.reduce((sum, repo) => sum + repo.forks_count, 0)}
            </Text>
            <Text variant="body-default-s" style={{ color: '#6B7280' }}>
              Total Forks
            </Text>
          </div>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .github-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function Work() {
  return (
    <Column maxWidth="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <GithubProjectsGrid />
    </Column>
  );
}
