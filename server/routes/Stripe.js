// stripeModule.mjs

import Stripe from 'stripe';
import dotenv from 'dotenv'
import express from 'express';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);
const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ['data.product'],
  });
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/subscription`,
  });

  res.send({ url: session.url });
});

export default router;
