import { expect, server } from './setup';

describe('Cart', () => {
  it('Add item to cart', (done) => {
    const data = {
      qty: 2,
    };
    server
      .post('/cart/1/1')
      .send(data)
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.item.id).to.equal(1);
        expect(res.body.item.user_id).to.equal(1);
        expect(res.body.item.item_id).to.equal(1);
        expect(res.body.item.qty).to.equal(2);
        expect(res.body.item.price).to.equal(2);
        done();
      });
  });
  it('Add same item to cart fail', (done) => {
    const data = {
      qty: 2,
    };
    server
      .post('/cart/1/1')
      .send(data)
      .expect(400)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal(
          `Item id 1 on user id 1 already exists`
        );
        done();
      });
  });
  it('Updates item on cart', (done) => {
    const data = {
      qty: 3,
    };
    server
      .put('/cart/1/1')
      .send(data)
      .expect(203)
      .end((err, res) => {
        expect(res.status).to.equal(203);
        expect(res.body.item.id).to.equal(1);
        expect(res.body.item.user_id).to.equal(1);
        expect(res.body.item.item_id).to.equal(1);
        expect(res.body.item.qty).to.equal(3);
        expect(res.body.item.price).to.equal(3);
        done();
      });
  });
  it('get item on cart', (done) => {
    server
      .get('/cart/1/1')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.item.id).to.equal(1);
        expect(res.body.item.user_id).to.equal(1);
        expect(res.body.item.item_id).to.equal(1);
        expect(res.body.item.qty).to.equal(3);
        expect(res.body.item.price).to.equal(3);
        done();
      });
  });
  it('get all items on cart', (done) => {
    server
      .get('/cart/1')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.items).to.be.instanceOf(Array);
        res.body.items.forEach((m) => {
          expect(m).to.have.property('id');
          expect(m).to.have.property('user_id');
          expect(m).to.have.property('item_id');
          expect(m).to.have.property('qty');
          expect(m).to.have.property('price');
        });
        done();
      });
  });
  it('get wrong item on cart', (done) => {
    server
      .get('/cart/1/2')
      .expect(404)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal(
          `Item id 2 on user id 1 doesn't exist`
        );
        done();
      });
  });
  it('Add second item to cart', (done) => {
    const data = {
      qty: 3,
    };
    server
      .post('/cart/1/2')
      .send(data)
      .expect(201)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.item.id).to.equal(2);
        expect(res.body.item.user_id).to.equal(1);
        expect(res.body.item.item_id).to.equal(2);
        expect(res.body.item.qty).to.equal(3);
        expect(res.body.item.price).to.equal(6);
        done();
      });
  });
  it('checkouts cart', (done) => {
    server
      .post('/cart/1/checkout')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.order.id).to.equal(1);
        expect(res.body.order.user_id).to.equal(1);
        expect(res.body.order.total).to.equal(9);
        expect(res.body.order.status).to.equal('pending');
        done();
      });
  });
  it('deletes cart', (done) => {
    server
      .delete('/cart/1')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Cart id 1 is successfuly deleted.');
        done();
      });
  });
});
