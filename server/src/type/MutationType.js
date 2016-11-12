// @flow

import {
  GraphQLObjectType,
} from 'graphql';

import LoginEmail from '../mutation/LoginEmailMutation';
import RegisterEmail from '../mutation/RegisterEmail';
import ChangePassword from '../mutation/ChangePasswordMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    // auth
    LoginEmail,
    RegisterEmail,
    ChangePassword,
  }),
});
