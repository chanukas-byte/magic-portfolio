import { Flex, IconButton, SmartLink, Text, Column } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      as="footer"
      fillWidth
      padding="8"
      horizontal="center"
      mobileDirection="column"
      background="surface"
      border="neutral-alpha-weak"
    >
      <Flex
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="space-between"
        vertical="center"
      >
        <Column gap="8">
          <Text variant="body-default-s" onBackground="neutral-strong">
            <Text onBackground="neutral-weak">© {currentYear} /</Text>
            <Text paddingX="4">{person.name}</Text>
            <Text onBackground="neutral-weak">
              / {person.role}
            </Text>
          </Text>
          <Column gap="4">
            <Text variant="body-default-s" onBackground="neutral-weak">
              Email: <SmartLink href={`mailto:${person.email}`}>{person.email}</SmartLink>
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Mobile: <SmartLink href="tel:+94770226035">+94 77 022 6035</SmartLink>
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Location: {person.location.split('/').join(', ')}
            </Text>
          </Column>
        </Column>
        <Flex gap="16">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )}
        </Flex>
      </Flex>
      <Flex height="80" show="s"></Flex>
    </Flex>
  );
};
