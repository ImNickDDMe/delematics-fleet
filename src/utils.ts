import { createId, isCuid } from '@paralleldrive/cuid2';

export const generateID = (prefix: string) => `${prefix}_${createId()}`;

export const validateID = (input: string, prefix: string) =>
    input.split('_')[0] == prefix && isCuid(input.split('_')[1]);