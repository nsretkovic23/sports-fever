import mongoose from 'mongoose'

//treba dodati kreatora-korisnika, kako bi se znalo ciji je event
//treba dodati niz prijavljenih korisnika
//treba dodati  za komentare

const sportEventSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    time: String,
    free_spots: Number,
    sport: String,
    lat: Number,
    lng: Number,
    price: Number,
    creator: String,
    participants: [
      {
        id: String,
        name: String,
        avgrate: Number,
        count: Number,
        ratings: [Number],
      },
    ],
    ratings: [{ graderid: String, gradedid: String }],
  },
  {
    timestamps: true,
  }
)

var SportEvent = mongoose.model('SportEvent', sportEventSchema)

export default SportEvent
