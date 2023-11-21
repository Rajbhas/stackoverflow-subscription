import Payment from '../models/payment.js';

export const makePayment = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    // Update the subscription amount in the database
    const updatedPayment = await Payment.findOneAndUpdate({ userId: userId }, { amount });

    if (!updatedPayment) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json({ message: 'Subscription amount updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
