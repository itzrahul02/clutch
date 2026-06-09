const { z } = require("zod");

const verifyTokenSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    token: z.string().length(64),
  }),
  query: z.object({}).default({}),
});

module.exports = {
  verifyTokenSchema,
};
