import mongoose from "mongoose";


const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    content: {
        type: String,
        required: true,
    }
},{timestamps:true})

const Note = mongoose.model('Note', notesSchema)

export default Note;