const { z } = require("zod");

const addGameSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    minPlayers: z.coerce.number().int().min(1),
    maxPlayers: z.coerce.number().int().min(1),
    rules: z.array(z.string().min(1)).min(1),
    img: z.string().min(1),
  }).refine((data) => data.maxPlayers >= data.minPlayers, {
    message: "maxPlayers must be greater than or equal to minPlayers",
    path: ["maxPlayers"],
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

const listGamesSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({}).default({}),
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    search: z.string().trim().max(100).optional(),
    sortBy: z.enum(["createdAt", "name"]).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  }),
});

module.exports = {
  addGameSchema,
  listGamesSchema,
};
