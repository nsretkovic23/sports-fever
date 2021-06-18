import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import sportEventRoutes from './routes/sportEvents.js'
import userRoutes from './routes/users.js'
import messageRoutes from './routes/message.js'
import reportRoutes from './routes/reports.js'
import creditRequestRoutes from './routes/creditRequests.js'

const app = express()

app.use(express.json({ limit: '30mb', extended: true })) //ovaj .use i donji .use poziv su umesto body parsera da bi nam radili post requesti
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/event', sportEventRoutes)
app.use('/user', userRoutes)
app.use('/message', messageRoutes)
app.use('/report', reportRoutes);
app.use('/creditrequest', creditRequestRoutes)

const CONNECTION_URL =
  'mongodb+srv://sfadmin:softversko123@cluster0.qruqt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5001

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
