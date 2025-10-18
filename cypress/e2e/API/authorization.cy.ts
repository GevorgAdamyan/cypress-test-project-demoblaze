import Authorization from '../../api/Authorization';
import {
  STRING,
  WRONG_PASSWORD,
  WRONG_USERNAME,
} from '../../support/constants/variables';
import {
  USER_ALREADY_EXISTS_MESSAGE,
  WRONG_PASSWORD_MESSAGE,
} from '../../support/constants/errors_and_messages';

const authorization = new Authorization();
let username: string;
let password: string;

describe('Authorization', () => {
  before(() => {
    username = `test${Date.now()}`;
    password = 'Test1234';
    authorization.signupUser(username, password).then(res => {
      expect(res.status).to.equal(200);
    });
  });

  it('Login user', () => {
    authorization.loginUser(username, password).then(res => {
      expect(res.status).to.equal(200);
      expect(typeof res.body).to.equal(STRING);
    });
  });

  it('Login user with wrong credentials', () => {
    authorization.loginUser(WRONG_USERNAME, WRONG_PASSWORD).then(res => {
      expect(res.status).to.equal(200);
      expect(res.body.errorMessage).to.equal(WRONG_PASSWORD_MESSAGE);
    });
  });

  it('Signup user with existing username', () => {
    authorization.signupUser(username, password).then(res => {
      expect(res.status).to.equal(200);
      expect(res.body.errorMessage).to.equal(USER_ALREADY_EXISTS_MESSAGE);
    });
  });

  it('Signup user with empty username', () => {
    authorization.signupUser('', password).then(res => {
      expect(res.status).to.equal(500);
    });
  });

  it('Login user with empty username', () => {
    authorization.loginUser('', password).then(res => {
      expect(res.status).to.equal(500);
    });
  });

  it('Login user with empty password', () => {
    authorization.loginUser(username, '').then(res => {
      expect(res.status).to.equal(200);
      expect(res.body.errorMessage).to.equal(WRONG_PASSWORD_MESSAGE);
    });
  });
});
