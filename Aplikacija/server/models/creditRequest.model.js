import mongoose from 'mongoose';

const creditRequestSchema = mongoose.Schema({
    amount:Number,
    receipt:String,
    userId:String
})

let CreditRequest = mongoose.model("CreditRequest", creditRequestSchema);

export default CreditRequest;