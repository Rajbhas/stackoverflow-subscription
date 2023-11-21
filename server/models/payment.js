import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  amount:{type:String},
  userId:{type:String},
});

const Payment = mongoose.model('payment', paymentSchema); // Change the model name to 'Payment'

export default Payment; // Correct the export statement
