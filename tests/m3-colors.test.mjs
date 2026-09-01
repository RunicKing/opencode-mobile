import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../constants/m3-colors.ts', import.meta.url), 'utf8');
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const {
  hexToRgb,
  hueOf,
  mixHex,
  hslToHex,
  rgbToHex,
  deriveTertiaryAndInverseRoles,
  STOCK_MD3_ROLES_LIGHT,
  STOCK_MD3_ROLES_DARK,
} = await import(`data:text/javascript,${encodeURIComponent(output)}`);

assert.deepEqual([...hexToRgb('#FF8000')], [255, 128, 0], 'hexToRgb should parse 6-digit hex');
assert.deepEqual([...hexToRgb('#ABC')], [170, 187, 204], 'hexToRgb should expand 3-digit hex');
assert.equal(rgbToHex([255, 128, 0]), '#ff8000', 'rgbToHex should round-trip');
assert.equal(mixHex('#000000', '#FFFFFF', 0.5), '#808080', 'mixHex should blend to the midpoint');
assert.equal(hueOf('#FF0000'), 0, 'pure red hue');
assert.equal(hueOf('#00FF00'), 120, 'pure green hue');
assert.equal(hslToHex(0, 1, 0.5), '#ff0000', 'hslToHex red');
assert.equal(hslToHex(120, 1, 0.5), '#00ff00', 'hslToHex green');
assert.equal(
  deriveTertiaryAndInverseRoles('light', '#0F8A6C').tertiary,
  deriveTertiaryAndInverseRoles('light', '#0F8A6C').tertiary,
  'tertiary derivation is deterministic',
);
assert.equal(
  deriveTertiaryAndInverseRoles('dark', '#7AE7C0').onTertiaryContainer[0],
  '#',
  'dark onTertiaryContainer is a hex string',
);
assert.match(STOCK_MD3_ROLES_LIGHT.primary, /^#[0-9A-F]{6}$/i, 'light stock primary is a hex string');
assert.match(STOCK_MD3_ROLES_DARK.primary, /^#[0-9A-F]{6}$/i, 'dark stock primary is a hex string');

assert.ok(deriveTertiaryAndInverseRoles('light', '#0F8A6C').inverseSurface !== deriveTertiaryAndInverseRoles('light', '#2563EB').inverseSurface, 'inverse surfaces vary by accent');
assert.ok(
  hexToRgb(deriveTertiaryAndInverseRoles('dark', '#7AE7C0').tertiary).length === 3,
  'dark tertiary is an rgb triple',
);

console.log('m3 colors tests passed');