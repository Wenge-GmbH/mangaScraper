import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SIGNUP_VALID } from '../types';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, error: '', authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case SIGNUP_VALID: {
      const { signupValid, email } = action.payload || '';
      return { ...state, signupValid, email };
    }

    default:
      return state;
  }
};
