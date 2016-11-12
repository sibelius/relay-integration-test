// @flow

import "reify/repl";
import 'isomorphic-fetch';
import 'babel-polyfill';
import REPL from 'repl';
import replPromised from 'repl-promised';
import history from 'repl.history';

import connectDatabase from './src/database';
import * as M from './src/models';
import { generateToken } from './src/auth';

(async() => {
  try {
    const info = await connectDatabase();
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);

    let repl = REPL.start({
      prompt: 'awesome > ',
    });
    repl.context.M = M;
    repl.context.generateToken = generateToken;

    history(repl, process.env.HOME+'/.node_history');

    replPromised.promisify(repl);
  } catch (error) {
    console.error('Unable to connect to database');
    process.exit(1);
  }
})();


