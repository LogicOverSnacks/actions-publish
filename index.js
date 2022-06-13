const core = require('@actions/core');
const github = require('@actions/github');

try {
  const owner = core.getInput('owner');
  const repo = core.getInput('repo');
  const release_id = core.getInput('release_id');

  const api = github.getOctokit(process.env.GITHUB_TOKEN).rest;
  await api.repos.updateRelease({ owner, repo, release_id, draft: false });
  console.log(`Published release for '${owner}/${repo}' with id '${release_id}'`);
} catch (error) {
  core.setFailed(error.message);
}
