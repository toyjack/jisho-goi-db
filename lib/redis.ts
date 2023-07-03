import { Redis } from "@upstash/redis";

const globalForRedis = global as unknown as { redis:Redis };

const url = process.env.UPSTASH_REDIS_REST_URL as string;
const token = process.env.UPSTASH_REDIS_REST_TOKEN as string;

export const redis =
  globalForRedis.redis ||
   new Redis({
    url,
    token,
   })

if (process.env.NODE_ENV !== "production") globalForRedis.redis = redis;