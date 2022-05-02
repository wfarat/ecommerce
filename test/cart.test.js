import { expect, server } from './setup';
describe('Cart', () => {
  it('Creates new cart', () => {
    server
      .post('/cart/1')
      .expect(200)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.cart.id).to.equal(1);
        expect(res.body.cart.user_id).to.equal(1);
        done();
      });
  });
});
