Simplish State
---

### Publishing a new version:

The npm package is published on the Github package registry as `@jonbrennecke/simplish-state`.

Login to the github package registry:
```
npm login --registry=https://npm.pkg.github.com --scope=@jonbrennecke
```

Then publish the package:
```
npm publish --access private
```

### Running unit tests

To run the unit tests, run:

```
npm t -- --verbose
```
