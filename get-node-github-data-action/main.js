
const core = require("@actions/core");
const github = require("@actions/github");

run();

async function run() {
  try {
    const githubUsername = core.getInput("github-username");
    const githubToken = core.getInput("github-token");

    const githubEmail = await lookupGitHubEmailByGitHubUsername(githubUsername, githubToken);
    core.setOutput("github-email", githubEmail);
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function lookupGitHubEmailByGitHubUsername(githubUsername, githubToken) {
  const octokit = github.getOctokit(githubToken);

  const {
    data: { email },
  } = await octokit.rest.users.getByUsername({
    username: githubUsername,
  });

  if (!email) {
    throw new Error(
      `No public email found for GitHub user: ${githubUsername}`
    );
  }

  return email
}
