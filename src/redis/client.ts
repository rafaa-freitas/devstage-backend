import { Redis } from 'ioredis';
import { env } from '../env';

// biome-ignore lint/style/useTemplate: <explanation>
export const redis = new Redis(env.REDIS_URL + '?family=0');
