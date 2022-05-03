import { expect, server } from './setup';

describe('Cart', () => {
  it('Creates new cart', (done) => {
    const data = {
      qty: 2,
    };
    server
      .post('/cart/1/1')
      .send(data)
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.cart.id).to.equal(1);
        expect(res.body.cart.user_id).to.equal(1);
        expect(res.body.cart.item_id).to.equal(1);
        expect(res.body.cart.qty).to.equal(2);
        expect(res.body.cart.price).to.equal(1);
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
