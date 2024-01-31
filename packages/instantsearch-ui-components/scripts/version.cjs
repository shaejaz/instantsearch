#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const version = require('../package.json').version;

fs.writeFileSync(
  path.resolve(__dirname, '../src/version.ts'),
  `export default '${version}';\n`
);
