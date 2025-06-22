'use client';

import React from 'react';
import { Text, Column, Flex } from "@once-ui-system/core";
import { about } from '@/resources';
import { SkillCard } from './SkillCard';

export const Tools = () => {
  return (
    <Column gap="32" style={{ width: '100%' }}>
      <Text variant="heading-default-xl" style={{
        textAlign: 'center',
        background: 'linear-gradient(45deg, #8B5CF6, #EC4899)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {about.tools.title}
      </Text>
      <Flex gap="24" wrap horizontal='center' vertical='center'>
        {about.tools.skills.map((skill, index) => (
          <SkillCard key={skill.title} skill={skill as any} index={index} />
        ))}
      </Flex>
    </Column>
  );
}; 