import { getPostsServer } from "@/app/utils/serverUtils";
import { getGithubRepos } from "@/app/utils/getGithubRepos";
import { Column } from "@once-ui-system/core";
import { ProjectCard } from "@/components";
import { person } from "@/resources"; // Import person to get GitHub username

interface ProjectsProps {
  range?: [number, number?];
}

export async function Projects({ range }: ProjectsProps) {
  let allProjects = getPostsServer(["src", "app", "work", "projects"]);
  const githubRepos = await getGithubRepos("chanukas-byte"); // Fetch GitHub repos

  const mappedGithubProjects = githubRepos.map((repo: any) => ({
    metadata: {
      title: repo.name.replace(/-/g, ' ').split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      publishedAt: repo.created_at,
      summary: repo.description,
      images: ["/images/projects/github-placeholder.jpg"], // Placeholder image
      link: repo.html_url,
      team: [], // No team info from GitHub API directly
    },
    slug: repo.name,
    content: repo.description, // Use description as content for now
  }));

  const combinedProjects = [...allProjects, ...mappedGithubProjects];

  const sortedProjects = combinedProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={post.metadata.link || `work/${post.slug}`}
          images={post.metadata.images || ["/images/projects/github-placeholder.jpg"]}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member: { avatar: string }) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
