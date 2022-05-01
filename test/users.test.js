import { expect, server } from './setup';

describe('Users', () => {
  it('posts user', (done) => {
    const data = {
      email: 'testuser@gmail.com',
      password: '12345678',
      fullname: 'test user',
    };
    server
      .post('/user/register')
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.user.id).to.equal(1);
        expect(res.body.user.email).to.equal(data.email);
        expect(res.body.user.fullname).to.equal(data.fullname);
        done();
      });
  });
  it('throws error on bad id', (done) => {
    server
      .get('/user/2')
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("User id 2 doesn't exist");
        done();
      });
  });
  it('get user', (done) => {
    server
      .get('/user/1')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.user.id).to.equal(1);
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
      .put('/user/1')
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.user.id).to.equal(1);
        expect(res.body.user.email).to.equal('updateduser@gmail.com');
        expect(res.body.user.fullname).to.equal('updated user');
        done();
      });
  });
  it('deletes user', (done) => {
    server
      .delete('/user/1')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User id 1 is successfuly deleted.');
        done();
      });
  });
});
