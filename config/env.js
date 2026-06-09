const { z } = require("zod");

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  ENV: z.string().optional(),
  PORT: z.coerce.number().int().positive().default(1234),
  MONGO_URI: z.string().min(1).optional(),
  REDIS_URL: z.string().url().optional(),
  CLIENT_ORIGIN: z.string().url().default("http://localhost:5173"),
  APP_BASE_URL: z.string().url().default("http://localhost:1234"),
  JWT_SECRET: z.string().min(12).default("dev-secret-change-me"),
  JWT_EXPIRES_IN: z.string().default("1d"),
  EMAIL: z.string().email().optional(),
  PASS: z.string().min(1).optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const errors = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("; ");
  throw new Error(`Invalid environment variables: ${errors}`);
}

module.exports = parsed.data;
