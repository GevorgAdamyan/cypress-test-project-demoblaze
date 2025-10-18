import { b64EncodeUnicode } from '../support/helpers';
import BaseRequest from './BaseRequest';
import { SIGNUP, LOGIN } from '../support/constants/endpoint';
import { POST } from '../support/constants/methods';

export default class Authorization extends BaseRequest {
  signupUser(username: string, password: string) {
    const body = {
      username,
      password: b64EncodeUnicode(password),
    };
    return this.makeRequest(this.config(POST, SIGNUP, body));
  }

  loginUser(username: string, password: string) {
    const body = {
      username,
      password: b64EncodeUnicode(password),
    };
    return this.makeRequest(this.config(POST, LOGIN, body));
  }
}
