export async function getGithubRepos(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    if (!response.ok) {
      console.error(`GitHub API error: ${response.status} ${response.statusText}`);
      return [];
    }
    const repos = await response.json();
    return repos.filter((repo: any) => !repo.fork && repo.description); // Filter out forks and repos without descriptions
  } catch (error) {
    console.error("Failed to fetch GitHub repositories:", error);
    return [];
  }
} 