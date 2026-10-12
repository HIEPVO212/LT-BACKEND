import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { load } from 'js-yaml';
import type { OpenAPIV3 } from 'openapi-types';

const yamlPath = resolve(process.cwd(), 'docs/openapi.yaml');
const value = load(readFileSync(yamlPath, 'utf8'));

export const swaggerSpec = value as OpenAPIV3.Document;