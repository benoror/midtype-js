import { singleton } from '../constants/identifiers';
import {
  GET_CURRENT_USER,
  GET_CURRENT_USER_WITH_STRIPE
} from '../apollo/queries/currentUser';
import { handleHidden } from './hidden';

import { getJWT } from '../utils/jwt';

export const getUser = () => {
  if (getJWT()) {
    return singleton.client
      .query({
        query: singleton.config.stripe
          ? GET_CURRENT_USER_WITH_STRIPE
          : GET_CURRENT_USER
      })
      .then(({ data }) => {
        singleton.data.user = data.mUserInSession;
        handleHidden(document, singleton.data);
      });
  }
  handleHidden(document, singleton.data);
  return Promise.resolve();
};
