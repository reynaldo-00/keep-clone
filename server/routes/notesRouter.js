const express = require('express');
const db = require('../database/dbConfig');
const router = express.Router();
const helpers = require('../database/helpers')

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
    const {id} = req.decodedToken;

    const notes = await helpers.getNotes(id)

    const noteTagsPromises = notes.map(async note => {
        
        const tags = await helpers.getTags(note.id)
        
        return {...note, tags};
    })
    
    const noteWithTags = await Promise.all(noteTagsPromises);
    res.status(200).json(noteWithTags);
}

async function getNoteById(req, res) {
    const id = req.params.id;
    const userId = req.decodedToken.id;

    const note = await helpers.getNoteById(id, userId)
    
    if (!note) {
        res.status(400).json({error: "Error getting note or does not exist"});
        return;
    }

    const tags = await helpers.getTags(note.id, userId)

    res.status(200).json({...note, tags});
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
