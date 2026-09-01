import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const appearanceSource = await readFile(new URL('../constants/appearance.ts', import.meta.url), 'utf8');
let utilsSource = await readFile(new URL('../providers/opencode-provider-utils.ts', import.meta.url), 'utf8');
utilsSource = utilsSource.replace(/import \{[^}]*\} from '@\/constants\/appearance';\s*/g, '');
const output = ts.transpileModule(appearanceSource + '\n' + utilsSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { getConfiguredProviderIds } = await import(`data:text/javascript,${encodeURIComponent(output)}`);
const models = [{ id: 'openai/gpt', modelID: 'gpt', providerID: 'openai' }];

assert.deepEqual([...getConfiguredProviderIds({ enabled_providers: ['openai'] }, [], models)], ['openai']);
assert.deepEqual([...getConfiguredProviderIds({ disabled_providers: ['openai'], enabled_providers: ['openai'], provider: { openai: {} } }, ['openai'], models)], []);

console.log('provider utility tests passed');
