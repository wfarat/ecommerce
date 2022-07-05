import { expect, server } from './setup';

describe('Users', () => {
  it('posts user', (done) => {
    const data = {
      email: 'testuser@gmail.com',
      password: '12345678',
      fullname: 'test user',
    };
    server
      .post('/users/register')
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.user.fullname).to.equal(data.fullname);
        done();
      });
  });
  it('posts second user with same email fail', (done) => {
    const data = {
      email: 'testuser@gmail.com',
      password: '12345678',
      fullname: 'test user',
    };
    server
      .post('/users/register')
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
  it('throws error on bad id', (done) => {
    server
      .get('/users/3')
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("User id 3 doesn't exist");
        done();
      });
  });
  it('gets all users', (done) => {
    server
      .get('/users')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.users).to.be.instanceOf(Array);
        res.body.users.forEach((m) => {
          expect(m).to.have.property('email');
          expect(m).to.have.property('fullname');
        });
        done();
      });
  });
  it('get user', (done) => {
    server
      .get('/users/2')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.user.id).to.equal(2);
        expect(res.body.user.email).to.equal('testuser@gmail.com');
        expect(res.body.user.fullname).to.equal('test user');
        done();
      });
  });
  it('updates users', (done) => {
    const data = {
      email: 'updateduser@gmail.com',
      fullname: 'updated user',
    };
    server
      .put('/users/2')
      .send(data)
      .expect(203)
      .end((err, res) => {
        expect(res.status).to.equal(203);
        expect(res.body.user.id).to.equal(2);
        expect(res.body.user.email).to.equal('updateduser@gmail.com');
        expect(res.body.user.fullname).to.equal('updated user');
        done();
      });
  });
  it('fails change with wrong password', (done) => {
    const data = {
      oldPassword: '123456789',
      newPassword: 'abcdefgh',
    };
    server
      .put('/users/2/password')
      .send(data)
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Incorrect password.');
        done();
      });
  });
  it('changes password', (done) => {
    const data = {
      oldPassword: '12345678',
      newPassword: 'abcdefgh',
    };
    server
      .put('/users/2/password')
      .send(data)
      .expect(203)
      .end((err, res) => {
        expect(res.status).to.equal(203);
        expect(res.body.message).to.equal('Password changed successfuly.');
        done();
      });
  });
  it('deletes user', (done) => {
    server
      .delete('/users/2')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User id 2 is successfuly deleted.');
        done();
      });
  });
});
