# actions-publish

A Github action to publish the latest draft release.

## Usage

```yaml
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Create Release
        id: create_release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: test
          release_name: Test
          draft: true
      - name: Publish latest draft release
        uses: logicoversnacks/actions-publish
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN  }}
        with:
          repo: ${{ github.repository }}
```
