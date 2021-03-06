import 'reflect-metadata';
import express from 'express';
import morgan from 'morgan';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildFederatedSchema } from './helpers/buildFederatedSchema';
import { RequestResolver } from './resolvers/Request';
import { APP_PORT } from './lib/config';

const app: express.Application = express();

interface Context {
  req: express.Request;
}

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('I am up');
});

async function main() {
  await createConnection();
  const schema = await buildFederatedSchema({ resolvers: [RequestResolver] });
  const context = ({ req }: Context) => {
    const tenantId = req.headers['frontegg-tenant-id'] || '';
    return { tenantId };
  };
  const server = new ApolloServer({ schema, context });
  server.applyMiddleware({ app });
  app.listen({ port: APP_PORT });
}

main().then(() => console.log('Server has started!'));
