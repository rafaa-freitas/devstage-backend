import { name } from 'drizzle-orm';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import z, { string } from 'zod';
import { getRanking } from '../functions/get-ranking';
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count';

export const getRankingRoute: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/ranking',
    {
      schema: {
        summary: 'Get ranking',
        tags: ['Referral'],

        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: string(),
                name: string(),
                score: z.number(),
              })
            ),
          }),
        },
      },
    },
    async (request) => {
      const { rankingWithScore } = await getRanking();

      return { ranking: rankingWithScore };
    }
  );
};
