import { Router } from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, updateNote } from "../controllers/notes.controller.js";


const notesRoute = Router();

notesRoute.get('/', getAllNotes)

notesRoute.get('/:id', getNoteById)

notesRoute.post("/", createNote)

notesRoute.put("/:id", updateNote)

notesRoute.delete("/:id", deleteNote)

export default notesRoute;