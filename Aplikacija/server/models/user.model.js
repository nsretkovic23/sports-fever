import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {type: String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    id: {type:String},
    credits:Number,
    createdEvents: [{eventId:String, eventTitle:String}],
    joinedEvents: [{eventId:String, eventTitle:String}],
    notifications: [{description:String, isSeen:Number}],
    averageRate:Number,
    rates:[Number]
})

let User = mongoose.model("User", userSchema);

export default User;