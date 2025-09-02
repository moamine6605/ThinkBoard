import express, { urlencoded } from 'express';
const app = express();
import 'dotenv/config.js'
const PORT = process.env.PORT;
import cors from 'cors'
import notesRoute from './routes/notes.route.js';
import connectDB from './config/db.js';


app.use(cors())
app.use(express.json())
app.use(urlencoded({extends:true}))

app.use('/api/notes', notesRoute)


app.listen(PORT, async ()=> {
    await connectDB();
    console.log(`listening on port: ${PORT}`)
})