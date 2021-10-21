#!/usr/bin/env node

process.on('unhandledRejection', (err) => {
  throw err;
});

console.log('Jest tool');
