# Edmonton Tamil Catholics

Use Node.js 24 for local builds and Vercel deployments. The `engines.node` setting
in `package.json` selects Node.js 24 on Vercel, overriding the project setting.

```sh
nvm use
npm ci
npm run test:kids
npm run build:css
```

The website is static HTML and uses the generated `src/output.css` stylesheet.
