// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import {
  globalIdField,
  connectionArgs,
  fromGlobalId,
} from 'graphql-relay';
import { NodeInterface } from '../interface/NodeInterface';


import MeType from './MeType';

import UserType from './UserType';
import UserLoader from '../loader/UserLoader';
import UserConnection from '../connection/UserConnection';

export default new GraphQLObjectType({
  name: 'Viewer',
  description: '...',
  fields: () => ({
    id: globalIdField('Viewer'),
    me: {
      type: MeType,
      resolve: (root, args, { user }) => user,
    },
    user: {
      type: UserType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: (obj, args, { user }) => {
        const { id } = fromGlobalId(args.id);
        return UserLoader.load(user, id);
      },
    },
    users: {
      type: UserConnection.connectionType,
      args: {
        ...connectionArgs,
        search: {
          type: GraphQLString,
        },
      },
      resolve: (obj, args, { user }) => UserLoader.loadUsers(user, args),
    },
  }),
  interfaces: () => [NodeInterface],
});
