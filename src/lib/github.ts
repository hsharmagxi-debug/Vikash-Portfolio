import axios from "axios";

const GITHUB_USERNAME = "vikas0486";

export const getRepos = async () => {
  try {
    const res = await axios.get(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`
    );

    // Filter only meaningful repos
    const filtered = res.data.filter((repo: any) => {
      return (
        !repo.fork &&
        repo.stargazers_count >= 0 &&
        repo.name !== GITHUB_USERNAME
      );
    });

    return filtered;
  } catch (error) {
    console.error("GitHub API error:", error);
    return [];
  }
};