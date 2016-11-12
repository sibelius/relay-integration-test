// @flow

import 'isomorphic-fetch';

import Koa from 'koa';
import cors from 'koa-cors';
import graphqlHTTP from 'koa-graphql';
import convert from 'koa-convert';
import logger from 'koa-logger';

import { schema } from './schema';
import { jwtSecret } from './config';
import { getUser } from './auth';

const app = new Koa();

app.keys = jwtSecret;

app.use(logger());
app.use(convert(cors()));
app.use(convert(graphqlHTTP(async (req) => {
  const { user } = await getUser(req.header.authorization);

  return {
    graphiql: true,
    schema,
    context: {
      user,
    },
    formatError: (error) => {
      console.log(error.message);
      console.log(error.locations);
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  };
})));

export default app;
