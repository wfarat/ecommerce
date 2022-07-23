import { expect, server } from './setup';

describe('Cart', () => {
  it('posts user', (done) => {
    const data = {
      email: 'testuser@gmail.com',
      password: '12345678',
      firstname: 'test',
      lastname: 'user',
    };
    server
      .post('/register')
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.user).to.equal(data.firstname);
        done();
      });
  });
  it('posts second user with same email fail', (done) => {
    const data = {
      email: 'testuser@gmail.com',
      password: '12345678',
      firstname: 'test',
      lastname: 'user',
    };
    server
      .post('/register')
      .send(data)
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(
          'User with this email already exists.'
        );
        done();
      });
  });
  it('logs user in', (done) => {
    const data = {
      email: 'testuser@gmail.com',
      password: '12345678',
    };
    server
      .post('/login')
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
