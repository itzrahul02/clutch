const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(8).max(72),
    role: z.enum(['admin', 'coordinator', 'player']).optional(),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(72),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

module.exports = {
  registerSchema,
  loginSchema,
};
