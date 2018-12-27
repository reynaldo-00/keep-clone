import React from 'react';
import NoteTags from './NoteTags';
import { NoteEditIcon, NoteContainer, NoteTitle, NoteBody } from '../../styles'


const Note = ({ note, noteClicked }) => {
    return (
        <NoteContainer onClick={noteClicked}>
            <NoteEditIcon><i className="fas fa-pen-alt"></i></NoteEditIcon>
            <NoteTitle>{note.title}</NoteTitle>
            <NoteBody markdown={note.textBody}/>
            <NoteTags tags={note.tags}/>
        </NoteContainer>
    );
}

export default Note;

