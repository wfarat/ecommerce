import { expect, server } from './setup';

describe('Orders', () => {
  it('gets orders by user', (done) => {
    server
      .get('/orders/1')
      .expect(200)
      .end((err, res) => {
        expect(res.body.orders).to.be.instanceOf(Array);
        res.body.orders.forEach((m) => {
          expect(m).to.have.property('id');
          expect(m).to.have.property('user_id');
          expect(m).to.have.property('total');
          expect(m).to.have.property('created');
          expect(m).to.have.property('modified');
          expect(m).to.have.property('status');
        });
        done();
      });
  });
  it('gets order items by user', (done) => {
    server
      .get('/orders/1/1/items')
      .expect(200)
      .end((err, res) => {
        expect(res.body.orderItems).to.be.instanceOf(Array);
        res.body.orderItems.forEach((m) => {
          expect(m).to.have.property('id');
          expect(m).to.have.property('order_id');
          expect(m).to.have.property('item_id');
          expect(m).to.have.property('qty');
          expect(m).to.have.property('price');
        });
        done();
      });
  });
});
