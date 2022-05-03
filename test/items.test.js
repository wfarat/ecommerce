import { expect, server } from './setup';

describe('Item', () => {
  it('posts item', (done) => {
    const data = {
      name: 'something',
      price: 12345678,
      description: 'very expensive something',
    };
    server
      .post('/items')
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.item.id).to.equal(2);
        expect(res.body.item.name).to.equal(data.name);
        expect(res.body.item.price).to.equal(data.price);
        expect(res.body.item.description).to.equal(data.description);
        done();
      });
  });
  it('get item', (done) => {
    server
      .get('/items/2')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.item.id).to.equal(2);
        expect(res.body.item.name).to.equal('something');
        expect(res.body.item.price).to.equal(12345678);
        expect(res.body.item.description).to.equal('very expensive something');
        done();
      });
  });
  it('gets all items', (done) => {
    server
      .get('/items')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.users).to.be.instanceOf(Array);
        res.body.users.forEach((m) => {
          expect(m).to.have.property('name');
          expect(m).to.have.property('price');
          expect(m).to.have.property('description');
        });
        done();
      });
  });
  it('throws error on bad id', (done) => {
    server
      .get('/items/3')
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal("Item id 3 doesn't exist");
        done();
      });
  });
  it('updates item', (done) => {
    const data = {
      name: 'something different',
      price: 12345699,
      description: 'very expensive something different',
    };
    server
      .put('/items/2')
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.item.id).to.equal(2);
        expect(res.body.item.name).to.equal(data.name);
        expect(res.body.item.price).to.equal(data.price);
        expect(res.body.item.description).to.equal(data.description);
        done();
      });
  });
  it('deletes item', (done) => {
    server
      .delete('/items/2')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Item id 2 is successfuly deleted.');
        done();
      });
  });
});