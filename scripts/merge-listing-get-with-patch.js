/**
 * Reads full listing JSON from stdin and merges shallow keys from a patch JSON file (argv[1]).
 * Writes merged JSON to stdout for PUT /api/listings/:id against older servers without PATCH semantics.
 */
const fs = require('fs');

const patchPath = process.argv[2];
if (!patchPath) {
  console.error('Usage: curl .../api/listings/ID | node merge-listing-get-with-patch.js <patch.json>');
  process.exit(1);
}

const patch = JSON.parse(fs.readFileSync(patchPath, 'utf8'));
let buf = '';
process.stdin.on('data', (c) => {
  buf += c;
});
process.stdin.on('end', () => {
  const cur = JSON.parse(buf);
  process.stdout.write(JSON.stringify({ ...cur, ...patch }));
});
