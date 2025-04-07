# Complete Guide to Publishing React DevPeek to npm

## 1. Prepare Your Package

Before publishing, make sure your package.json is properly configured:

```json
{
  "name": "react-devpeek",
  "version": "0.1.0",
  "description": "A developer tool for debugging React state and local storage",
  "main": "dist/react-devpeek.umd.js",
  "module": "dist/react-devpeek.es.js",
  "types": "dist/index.d.ts",
  "files": ["dist", "README.md"],
  "keywords": [
    "react",
    "developer-tools",
    "local-storage",
    "state-management",
    "debugging",
    "zustand",
    "context-api"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/react-devpeek.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/react-devpeek/issues"
  },
  "homepage": "https://github.com/yourusername/react-devpeek#readme",
  "peerDependencies": {
    "react": ">=16.8.0",
    "react-dom": ">=16.8.0"
  }
}
```

## 2. Update Your README.md

Ensure your README.md contains:

- Clear installation instructions
- Usage examples
- API documentation
- License information

## 3. Test Your Package Locally

Before publishing, test the package locally:

```bash
# Build the package
npm run build

# Create a local link
npm link

# Create a test project
mkdir test-devpeek
cd test-devpeek
npm init -y
npm install react react-dom

# Link to your local package
npm link react-devpeek

# Create a simple test app and verify it works
```

## 4. Publish to npm

Once you're satisfied with your local testing:

```bash
# Login to your npm account
npm login

# Publish your package
npm publish

# If you want to publish a beta version
npm publish --tag beta
```

## 5. Publish a Scoped Package (Optional)

If you want to publish under your npm username:

```bash
# Update your package.json name to:
# "@yourname/react-devpeek"

# Publish as public
npm publish --access public
```

## 6. Set Up GitHub Pages Demo

Create a GitHub Pages demo so users can try your tool:

```bash
# Build the demo
npm run build:demo

# Deploy to GitHub Pages
npm install -D gh-pages
```

Add to package.json:

```json
"scripts": {
  "deploy:demo": "gh-pages -d demo/dist"
}
```

Then run:

```bash
npm run deploy:demo
```

## 7. Set Up NPM Scripts

Update your package.json scripts for a smooth workflow:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "demo": "vite serve demo --config demo-vite.config.ts",
  "build:demo": "vite build --config demo-vite.config.ts",
  "prepublishOnly": "npm run test && npm run build",
  "deploy:demo": "gh-pages -d demo/dist"
}
```

## 8. Versioning and Releases

For updating your package:

```bash
# Bump version (patch, minor, or major)
npm version patch
# or
npm version minor
# or
npm version major

# Then publish
npm publish
```

## 9. Set Up GitHub Actions for CI/CD

Create a `.github/workflows/npm-publish.yml` file:

```yaml
name: Node.js Package

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
      - run: npm ci
      - run: npm test

  publish-npm:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 16
          registry-url: https://registry.npmjs.org/
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}
```

Remember to add your npm token to your GitHub repository secrets.

## 10. Marketing Your Package

After publishing:

1. Create a post on dev.to or Medium about your package
2. Share on Twitter/X with relevant hashtags (#react, #javascript, #opensource)
3. Post to Reddit communities like r/reactjs
4. Consider submitting to JavaScript/React newsletters
5. Add to your GitHub profile as a pinned repository
