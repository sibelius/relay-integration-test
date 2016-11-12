import { graphql } from 'graphql';
import { schema } from '../../schema';
import {
  User,
} from '../../models';
import { setupTest } from '../../../test/helper';

beforeEach(async () => setupTest());

it('should be null when user is not logged in', async () => {
  const query = `
    query Q {
      viewer {
        me {
          name
        }
      }
    }
  `;

  const rootValue = {};
  const context = {};

  const result = await graphql(schema, query, rootValue, context);
  const { data } = result;

  expect(data.viewer.me).toBe(null);
});

it('should return the current user when user is logged in', async () => {
  const user = new User({
    name: 'user',
    email: 'user@example.com',
  });
  await user.save();

  const query = `
    query Q {
      viewer {
        me {
          _id
          name
          email
          active
        }
      }
    }
  `;

  const rootValue = {};
  const context = { user };

  const result = await graphql(schema, query, rootValue, context);
  const { data } = result;

  expect(data.viewer.me.name).toBe(user.name);
});
