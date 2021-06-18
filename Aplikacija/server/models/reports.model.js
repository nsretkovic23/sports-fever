import mongoose from 'mongoose';

const reportSchema = mongoose.Schema({
    title:String,
    description:String,
    type:String,
    reportedThingId:String,
    userThatReportedId:String
})

let Report = mongoose.model("Report", reportSchema);

export default Report;