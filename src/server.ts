import { fastifyCors } from '@fastify/cors';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { fastify } from 'fastify';
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
import { db } from './drizzle/client';
import { env } from './env';
import { accessInviteLinkRoute } from './routes/access-invite-link-route';
import { getRankingRoute } from './routes/get-ranking-route';
import { getSubscriberInviteClicksRoute } from './routes/get-subscriber-invite-clicks-route';
import { getSubscriberInvitesCountRoute } from './routes/get-subscriber-invites-count-route';
import { getSubscriberRankingPositionRoute } from './routes/get-subscriber-ranking-position-route';
import { subscribeToEventRoute } from './routes/subscribe-to-event-route';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors, { origin: 'http://localhost:3333' });

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
});

migrate(db, { migrationsFolder: './src/drizzle/migrations' })
  .then(() => {
    console.log('Migrations complete!');
  })
  .catch((err) => {
    console.error('Migrations failed!', err);
    process.exit(1);
  });

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

app.register(subscribeToEventRoute);
app.register(accessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInvitesCountRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute);

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('🔥 HTTP server is running on port 3333');
});
