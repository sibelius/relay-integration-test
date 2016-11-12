// @flow

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql';
import {
  globalIdField,
} from 'graphql-relay';
import {
  NodeInterface,
} from '../interface/NodeInterface';

export default new GraphQLObjectType({
  name: 'Me',
  description: 'Object with data related and only available to the logged user',
  fields: () => ({
    id: globalIdField('Me'),
    _id: {
      type: GraphQLString,
      resolve: user => user._id,
    },
    name: {
      type: GraphQLString,
      resolve: user => user.name,
    },
    email: {
      type: GraphQLString,
      resolve: user => user.email,
    },
    active: {
      type: GraphQLBoolean,
      resolve: user => user.active,
    },
  }),
  interfaces: () => [NodeInterface],
});
