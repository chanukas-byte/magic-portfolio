"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Badge,
  Icon,
} from "@once-ui-system/core";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  return (
    <Column 
      fillWidth 
      gap="m"
      background="surface"
      border="neutral-alpha-weak"
      radius="l"
      padding="l"
      transition="micro-medium"
      className="hover:shadow-lg"
    >
      <Carousel
        sizes="(max-width: 960px) 100vw, 960px"
        items={images.map((image) => ({
          slide: image,
          alt: title,
        }))}
        radius="m"
      />
      <Flex
        mobileDirection="column"
        fillWidth
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex flex={5} direction="column" gap="8">
            <Heading as="h2" wrap="balance" variant="heading-strong-xl">
              {title}
            </Heading>
            <Flex gap="8" wrap>
              <Badge background="primary-alpha-weak" paddingX="12" paddingY="4" onBackground="neutral-strong">
                Data Science
              </Badge>
              <Badge background="secondary-alpha-weak" paddingX="12" paddingY="4" onBackground="neutral-strong">
                Machine Learning
              </Badge>
            </Flex>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column flex={7} gap="16">
            {avatars?.length > 0 && <AvatarGroup avatars={avatars} size="m" reverse />}
            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            <Flex gap="24" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  style={{ margin: "0", width: "fit-content" }}
                  href={href}
                >
                  <Text variant="body-default-s">View Details</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  style={{ margin: "0", width: "fit-content" }}
                  href={link}
                >
                  <Text variant="body-default-s">Live Demo</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
