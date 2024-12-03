import { createId, isCuid } from '@paralleldrive/cuid2';
import { z } from '@hono/zod-openapi';

export const generateID = (prefix: string) => `${prefix}_${createId()}`;

export const validateID = (input: string, prefix: string) =>
    input.split('_')[0] == prefix && isCuid(input.split('_')[1]);