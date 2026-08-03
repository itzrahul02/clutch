const { z } = require('zod');

const empty = z.object({}).default({});

const createTournamentSchema = z.object({
  body: z
    .object({
      title: z.string().trim().min(3).max(120),
      gameId: z.string().regex(/^[a-f\d]{24}$/i, 'Invalid game ID'),
      description: z.string().trim().min(20).max(2000),
      format: z.enum(['single-elimination', 'round-robin']).default('single-elimination'),
      startsAt: z.coerce.date(),
      registrationClosesAt: z.coerce.date(),
      maxTeams: z.coerce.number().int().min(2).max(512),
      prizePool: z.coerce.number().min(0).default(0),
      entryFee: z.coerce.number().min(0).default(0),
      bannerUrl: z.string().trim().url().or(z.literal('')).default(''),
      rules: z.array(z.string().trim().min(1).max(300)).max(30).default([]),
    })
    .refine((data) => data.registrationClosesAt < data.startsAt, {
      message: 'Registration must close before the tournament starts',
      path: ['registrationClosesAt'],
    }),
  params: empty,
  query: empty,
});

const listTournamentsSchema = z.object({
  body: empty,
  params: empty,
  query: z.object({
    status: z.enum(['upcoming', 'live', 'completed']).optional(),
    gameId: z
      .string()
      .regex(/^[a-f\d]{24}$/i, 'Invalid game ID')
      .optional(),
    search: z.string().trim().max(100).optional(),
  }),
});

const tournamentSlugSchema = z.object({
  body: empty,
  query: empty,
  params: z.object({ slug: z.string().trim().min(3).max(160) }),
});

module.exports = { createTournamentSchema, listTournamentsSchema, tournamentSlugSchema };
