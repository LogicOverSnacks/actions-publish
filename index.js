const core = require('@actions/core');
const github = require('@actions/github');

try {
  const [owner, repo] = core.getInput('repo').split('/');

  const api = github.getOctokit(process.env.GITHUB_TOKEN).rest;

  api.repos.listReleases({ owner: owner, repo: repo }).then(releases => {
    const drafts = releases.data
      .filter(({ draft }) => draft)
      .sort((a, b) => new Date(a.created_at) < new Date(b.created_at));

    if (!drafts.length)
      throw new Error('No drafts found.');

    api.repos.updateRelease({ owner, repo, release_id: drafts[0].id, draft: false })
      .then(({ data }) => console.log(`Published release for '${owner}/${repo}' with id '${data.id}', url: '${data.html_url}'`))
      .catch(error => core.setFailed(error.message));
  });
} catch (error) {
  core.setFailed(error.message);
}
