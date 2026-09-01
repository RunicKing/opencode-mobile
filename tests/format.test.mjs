import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/opencode/format.ts', import.meta.url), 'utf8');
const output = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { getMessagePreview, toTranscriptEntry, formatTimestamp } = await import(`data:text/javascript,${encodeURIComponent(output)}`);
const info = { id: 'message-1', role: 'assistant', sessionID: 'session-1', time: { created: 1 } };

assert.equal(getMessagePreview({ info, parts: [{ type: 'reasoning', text: 'private reasoning' }, { type: 'text', text: 'Visible reply' }] }), 'Visible reply');

const failedTool = toTranscriptEntry({
  info,
  parts: [{ id: 'tool-1', type: 'tool', tool: 'build', state: { status: 'error', error: 'Build failed' } }],
});
assert.equal(failedTool.details[0].body, 'Build failed');

const toolAttachment = toTranscriptEntry({
  info,
  parts: [{ id: 'tool-2', type: 'tool', tool: 'capture', state: { status: 'completed', output: 'done', attachments: [{ type: 'file', mime: 'image/png', filename: 'result.png' }] } }],
});
assert.equal(toolAttachment.details[1].label, 'result.png');

const evening = Date.parse('2026-09-01T22:22:00');
const formatted = formatTimestamp(evening);
assert.ok(!formatted.includes('22:22'), `expected 12-hour time, got: ${formatted}`);
assert.match(formatted, /\b10:22\b/, `expected 10:22 PM-ish time, got: ${formatted}`);

console.log('format tests passed');
