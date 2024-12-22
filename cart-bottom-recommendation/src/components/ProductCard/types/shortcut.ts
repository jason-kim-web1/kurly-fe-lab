import { z } from 'zod';

const ShortCutTypeEnum = z.enum(['cart', 'purchase', 'detail', 'restock_notification']);

type ShortCutType = z.infer<typeof ShortCutTypeEnum>;

export { ShortCutTypeEnum };
export type { ShortCutType };
