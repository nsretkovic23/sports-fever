import mongoose from 'mongoose'


const conversationSchema = mongoose.Schema(
  {
    eventId:String,
    members: {
        type: Array,
      }
  },
  {
    timestamps: true,
  }
)

var Conversation = mongoose.model('Conversation', conversationSchema)

export default Conversation