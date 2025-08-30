import express, { urlencoded } from 'express';
const app = express();
import 'dotenv/config.js'
const PORT = process.env.PORT;
import cors from 'cors'


app.use(cors())
app.use(express.json())
app.use(urlencoded({extends:true}))


app.get('/api/notes', (req, res)=> {
    res.send({note: "you got 5 notes"})
})


app.listen(PORT, ()=> {
    console.log(`listening on port: ${PORT}`)
})