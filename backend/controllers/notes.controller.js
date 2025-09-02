import express from 'express';
import Note from '../model/notes.model.js';


export const getAllNotes = async (req, res)=> {
    try {
        const notes = await Note.find().sort({createdAt:-1});
        res.status(200).send({data: notes})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id) res.status(400).send({message: "id is required"});

        const note = Note.findOne({_id: id});
        if(!note) res.status(404).send({message: "note not found"});

        res.status(200).send({note: note});
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

export const createNote = async (req, res)=>{
    try {    
        const {title, content} = req.body;
        if(!title || !content) res.status(400).send({message: 'All fields are required'});

        const existing = await Note.findOne({title});
        if(existing) res.status(400).send({message: "note already exists"});

        const note = await Note.create({title, content});
        res.status(201).send({message: "note created succesfully", note: note})
    } catch (error) {
        res.status(500).send({message: error.message})
    }

}

export const updateNote = async (req, res)=>{
    try {
        const { id } = req.params;
        if(!id) res.status(400).send({message: "id is required"});

        const { title, content } = req.body; 

        const existingNote = await Note.findOne({_id:id})
        if(!existingNote) res.status(400).send({message: "note does not exist"});

        existingNote.title = title || existingNote.title;
        existingNote.content = content || existingNote.content;

        const newNote = await existingNote.save();
        res.status(200).send({message: "note updated successfully", note: newNote});

    } catch (error) {
        res.status(500).send({message: error.message})
    }
}

export const deleteNote = async (req, res)=>{
    try {
        const { id } = req.params;
        if(!id) res.status(400).send({message: "id is required"});

        const existingNote = await Note.findOne({_id:id})
        if(!existingNote) res.status(400).send({message: "note does not exist"});

        const deletedNote = await existingNote.deleteOne({_id:id});
        res.status(200).send({message: "note deleted successfully", data: deletedNote});

    } catch (error) {
        res.status(500).send({message: error.message})
    }
}