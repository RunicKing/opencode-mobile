import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const appearanceSource = await readFile(new URL('../constants/appearance.ts', import.meta.url), 'utf8');
let themeSource = await readFile(new URL('../constants/theme.ts', import.meta.url), 'utf8');

globalThis.Platform = { select: (mapping) => mapping.default };

themeSource = themeSource
  .replace(/import \{[^}]*\} from 'react-native';\s*/g, '')
  .replace(/import \{[^}]*\} from '@\/constants\/appearance';\s*/g, '');

const combinedSource = `${appearanceSource}\n${themeSource}`;
const output = ts.transpileModule(combinedSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { ACCENT_OPTIONS, getColors, getAccentPalette, THEMES, Colors } = await import(`data:text/javascript,${encodeURIComponent(output)}`);

const HEX_RE = /^#[0-9A-Fa-f]{6}$/;

function assertValidPalette(label, palette) {
  const requiredRoles = [
    'text',
    'background',
    'surface',
    'surfaceAlt',
    'card',
    'tint',
    'accent',
    'muted',
    'border',
    'icon',
    'success',
    'warning',
    'danger',
    'bubbleUser',
    'onBubbleUser',
    'bubbleAssistant',
    'onBubbleAssistant',
    'tabBackground',
    'tabIconDefault',
    'tabIconSelected',
  ];
  for (const role of requiredRoles) {
    assert.match(palette[role], HEX_RE, `${label} ${role} should be a hex color`);
  }
}

for (const option of ACCENT_OPTIONS) {
  const light = getColors('light', option.id);
  const dark = getColors('dark', option.id);
  assertValidPalette(`${option.id} light`, light);
  assertValidPalette(`${option.id} dark`, dark);
}

assert.ok(Object.keys(THEMES).length === ACCENT_OPTIONS.length, 'every accent preset should have a full theme');
for (const option of ACCENT_OPTIONS) {
  assert.ok(THEMES[option.id], `theme should exist for ${option.id}`);
  assert.equal(THEMES[option.id].light.background, getColors('light', option.id).background, `${option.id} light background should come from the theme`);
  assert.equal(THEMES[option.id].dark.background, getColors('dark', option.id).background, `${option.id} dark background should come from the theme`);
}

const backgrounds = ACCENT_OPTIONS.map((option) => getColors('dark', option.id).background);
assert.ok(new Set(backgrounds).size === backgrounds.length, 'each dark theme should have a distinct background');
const lightBackgrounds = ACCENT_OPTIONS.map((option) => getColors('light', option.id).background);
assert.ok(new Set(lightBackgrounds).size === lightBackgrounds.length, 'each light theme should have a distinct background');

for (const option of ACCENT_OPTIONS) {
  const light = getColors('light', option.id);
  const dark = getColors('dark', option.id);
  assert.notEqual(light.background, dark.background, `${option.id} light and dark backgrounds should differ`);
  assert.notEqual(light.text, dark.text, `${option.id} light and dark text should differ`);
}

assert.equal(Colors.light.background, THEMES.brand.light.background, 'default Colors.light background should match the brand theme');
assert.equal(Colors.dark.background, THEMES.brand.dark.background, 'default Colors.dark background should match the brand theme');
assert.equal(
  getColors('dark', 'brand').tint,
  getAccentPalette('dark', 'brand').tint,
  'getColors should carry the selected accent tint',
);
assert.equal(getColors('dark', 'ocean').surface, THEMES.ocean.dark.surface, 'ocean dark surface should come from the theme');

console.log('theme tests passed');