const express = require('express');
const db = require('../database/dbConfig');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({aliveAt: '/notes'})
})

router.get('/get/all', getAllNotes);
router.get('/get/:id', getNoteById);
router.post('/create', createNote);
router.put('/edit/:id', editNote);
router.delete('/delete/:id', deleteNote);


module.exports = router;

async function getAllNotes(req, res) {
    // res.status(200).json({aliveAt: '/note/get/all'})
    const {id, username, roles} = req.decodedToken;

    const notes = await db('notes').where('user_id', '=', id);
    res.status(200).json(notes);
}

async function getNoteById(req, res) {
    const id = req.params.id;
    const userId = req.decodedToken.id;

    // const note = await db('notes').where('id' , '=', id).first();

    const note = await db('notes')
        .whereIn(['id', 'user_id'], [[id, userId]])
        .first();
    
    if (!note) {
        res.status(400).json({error: "Error getting note or does not exist"});
        return;
    }
    res.status(200).json(note);
}

async function createNote(req, res) {
    const id = req.decodedToken.id;

    const newNote = {...req.body, user_id: id};
    
    if (!newNote.title || !newNote.textBody) {
        res.status(422).json({error: "Note Title and Note TextBody is required"});
        return;
    }

    const noteId = await db('notes').returning('id').insert(newNote);
    console.log(noteId);

    res.status(201).json({success: true, noteId})
}

async function editNote(req, res) {
    const id = req.params.id;
    const newData = req.body;
    const userId = req.decodedToken.id;

    if (!newData && !newData.title && !newData.textBody && !newData.tags) {
        res.status(422).json({error: "Note Title or Note TextBody is required"});
        return;
    }

    const updatedNote = await db('notes')
        .whereIn(['id', 'user_id'], [[id, userId]])
        .update({...newData});
    
    console.log(updatedNote);
    if (updatedNote > 0) {
        const note = await db('notes').where('id', '=', id).first();
        res.status(201).json(note);
        return
    } else {
        res.status(500).json({error: "Error updating note"});
    }

}

async function deleteNote(req, res) {
    const id = req.params.id;
    const userId = req.decodedToken.id;

    
    await db('notes')
        .whereIn(['id', 'user_id'], [[id, userId]])
        .del();

    res.status(201).json({success: true});
}
