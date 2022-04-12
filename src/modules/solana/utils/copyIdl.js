/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const idl = require('../../../../../olympus-pro-solana/');

fs.writeFileSync('./app/src/idl.json', JSON.stringify(idl));
