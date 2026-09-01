import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../constants/appearance.ts', import.meta.url), 'utf8');
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const {
  ACCENT_OPTIONS,
  clampFontScale,
  DEFAULT_FONT_SCALE,
  FONT_SCALE_MAX,
  FONT_SCALE_MIN,
  getAccentPalette,
  isAccentColorId,
} = await import(`data:text/javascript,${encodeURIComponent(output)}`);

assert.ok(ACCENT_OPTIONS.length >= 3, `expected multiple accent presets, got ${ACCENT_OPTIONS.length}`);
assert.equal(ACCENT_OPTIONS[0].id, 'brand', 'brand accent should be the default preset');

const brand = ACCENT_OPTIONS[0];
assert.equal(getAccentPalette('light', 'brand').tint, brand.light.tint, 'brand light accent should match the preset');
assert.equal(getAccentPalette('dark', 'brand').tint, brand.dark.tint, 'brand dark accent should match the preset');
assert.equal(getAccentPalette('light', 'unknown').tint, brand.light.tint, 'unknown accent should fall back to brand');

assert.equal(clampFontScale(2), FONT_SCALE_MAX, 'font scale should be clamped to the maximum');
assert.equal(clampFontScale(0.1), FONT_SCALE_MIN, 'font scale should be clamped to the minimum');
assert.equal(clampFontScale(1.15), 1.15, 'font scale within range should be preserved');
assert.equal(clampFontScale(NaN), DEFAULT_FONT_SCALE, 'non-finite font scale should reset to the default');
assert.ok(clampFontScale(1.05) <= FONT_SCALE_MAX && clampFontScale(1.05) >= FONT_SCALE_MIN);

assert.ok(isAccentColorId('ocean'), 'ocean should be a valid accent id');
assert.ok(!isAccentColorId('magenta'), 'unknown accent id should be rejected');
assert.ok(!isAccentColorId(undefined), 'undefined accent id should be rejected');

console.log('appearance tests passed');