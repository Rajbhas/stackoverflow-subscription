import express from 'express';
import Payment from '../models/payment.js';
import { makePayment } from '../controllers/payment.js';

const router = express.Router();


router.post('/makePayment',async (req, res) => {
    const { userId, amount } = req.body;
  
    try {
      // Find the payment record for the user and update the amount
      const updatedPayment = await Payment.findOneAndUpdate({ userId }, { amount });
  
      if (!updatedPayment) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.json({ message: 'Subscription amount updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  export default router;