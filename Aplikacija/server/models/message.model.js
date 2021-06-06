import mongoose from 'mongoose'


const messageSchema = mongoose.Schema(
  {
    conversationId: {
        type: String,
      },
      sender: {
        type: String,
      },
      text: {
        type: String,
      },
  },
  {
    timestamps: true,
  }
)

var Message = mongoose.model('Message', messageSchema)

export default Message