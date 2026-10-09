import { z } from 'zod';

export function validateRequest<TSchema extends z.ZodType>(
  schema: TSchema,
  data: unknown,
): z.infer<TSchema> {
  return schema.parse(data);
}
