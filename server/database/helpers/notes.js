const db = require('../dbConfig');

const getNotes = userId => {
    return db('notes').where('user_id', '=', userId)
}

const getTags = noteId => {
    return db('tags as t')
        .join('note_tags as n', 'n.note_id', 't.id')
        .where({'n.note_id': noteId})
}

const getNoteById = (noteId, userId) => {
    return db('notes')
        .whereIn(['id', 'user_id'], [[noteId, userId]])
        .first();
}

const createNote = note => {
    return db('notes').returning('id').insert(note)
}

const editNote = (noteId, userId, data) => {
    return db('notes')
        .whereIn(['id', 'user_id'], [[noteId, userId]])
        .update(data);
}

const deleteNote = (noteId, userId) => {
    return db('notes')
        .whereIn(['id', 'user_id'], [[noteId, userId]])
        .del();
}

module.exports = {
    getNotes,
    getTags,
    getNoteById,
    createNote,
    editNote,
    deleteNote
}
