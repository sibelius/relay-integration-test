import { graphql } from 'graphql';
import { schema } from '../../schema';
import {
  User,
} from '../../models';
import { setupTest } from '../../../test/helper';

beforeEach(async () => setupTest());

it('should not show email of other users', async () => {
  const user = new User({
    name: 'user',
    email: 'user@example.com',
  });
  await user.save();

  const user1 = new User({
    name: 'awesome',
    email: 'awesome@example.com',
  });
  await user1.save();

  const query = `
    query Q {
      viewer {
        users(first: 2) {
          edges {
            node {  
              _id
              name
              email
              active
            }
          }
        }
      }
    }
  `;

  const rootValue = {};
  const context = { user };

  const result = await graphql(schema, query, rootValue, context);
  const { edges } = result.data.viewer.users;

  expect(edges[0].node.name).toBe(user.name);
  expect(edges[0].node.email).toBe(user.email);

  expect(edges[1].node.name).toBe(user1.name);
  expect(edges[1].node.email).toBe(null);
});
