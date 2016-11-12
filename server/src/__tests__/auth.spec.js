import mongoose from 'mongoose';
import { graphql } from 'graphql';
import { schema } from '../schema';
import {
  User,
} from '../models';
import { setupTest } from '../../test/helper';

import { getUser, generateToken } from '../auth';

const { ObjectId } = mongoose.Types;

beforeEach(async () => setupTest());

describe('getUser', () => {
  it('should return an user null when token is null', async () => {
    const token = null;
    const { user } = await getUser(token);

    expect(user).toBe(null);
  });

  it('should return null when token is invalid', async () => {
    const token = 'invalid token';
    const { user } = await getUser(token);

    expect(user).toBe(null);
  });

  it('should return null when token do not represent a valid user', async () => {
    const token = generateToken({ _id: new ObjectId()});
    const { user } = await getUser(token);

    expect(user).toBe(null);
  });

  it('should return user from a valid token', async () => {
    const viewer = new User({
      name: 'user',
      email: 'user@example.com',
    });
    await viewer.save();

    const token = generateToken(viewer);
    const { user } = await getUser(token);

    expect(user.name).toBe(user.name);
    expect(user.email).toBe(user.email);
  });
});
