const { z } = require("zod");

const playerSchema = z.object({
  name: z.string().min(2).max(100),
  UID: z.string().min(1).max(100),
  IGN: z.string().max(100).optional().default(""),
  email: z.string().email(),
});

const registerTeamSchema = z.object({
  body: z.object({
    gameName: z.string().min(2).max(100),
    teamName: z.string().min(2).max(100),
    contact: z.string().regex(/^\d{8,15}$/),
    teamPlayers: z.array(playerSchema).min(1).max(10),
  }),
  params: z.object({}).default({}),
  query: z.object({}).default({}),
});

const gameNameParamSchema = z.object({
  body: z.object({}).default({}),
  params: z.object({
    gameName: z.string().min(2).max(100),
  }),
  query: z.object({}).default({}),
});

module.exports = {
  registerTeamSchema,
  gameNameParamSchema,
};
