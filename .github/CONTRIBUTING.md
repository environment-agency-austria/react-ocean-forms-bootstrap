# How to contribute

## Deploy a new version
Only the maintainers of the repo can deploy a new version

### Deploy a regular release
1. Make sure that you are on the `master` branch
2. Figure out what the `<new-version-number>` will be
3. Update the [changelog](./CHANGELOG.md) so that all the yet unreleased changes are grouped under the `<new-version-number>`
4. Run: `$> git commit -m "doc: updated changelog"`
5. Run: `$> yarn version --new-version <new-version-number>"` (create tag v0.0.0)
6. Run: `$> git push`
7. Run: `$> git push --tags`
8. Instead of Step 5-7 go to the GitHub Releases and create a new draft and release and include the changes from the changelog
9. Release will be automatically pushed to npm 

### Deploy a tagged npm release
This is useful if you would like to create a `next` or `beta` release.

1. Run: `$> yarn publish . --tag <tag-name>`
