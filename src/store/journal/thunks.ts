import { Dispatch, AnyAction } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { addNewNote, setActiveNote, setNotes, setSaving, NoteProps, updateNote, setPhotosToActiveNote, deleteNoteById } from './journalSlice';
import { loadNotes, fileUpload } from '../../helpers/';
import { RootState } from '../store';
import Swal from "sweetalert2";

export const startNewNote = () => {
  return async( dispatch: Dispatch<AnyAction>, getState: any) => {
    dispatch( setSaving(true) );
    const { uid } = getState().auth;
    
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    } as NoteProps
    
    const newDoc = doc( collection(FirebaseDB, `${ uid }/journal/notes`) )
    await setDoc(newDoc, newNote);
    newNote.id = newDoc.id; 
    dispatch( addNewNote( newNote ) );
    dispatch( setActiveNote( newNote ) );
  }
}

export const startLoadingNotes = () => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    const { uid } = getState().auth;
    if( !uid ) throw new Error('El UID del usuario no existe');
    const notes = await loadNotes(uid);
    dispatch( setNotes( notes ))
  }
}

export const startSetActiveNote = (note: NoteProps) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch( setActiveNote( note ) );
  }
}

export const startSaveNote = () => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch( setSaving(true) )
    const { uid } = getState().auth;
    const { activeNote } = getState().journal;
    const noteToFirestore = { ...activeNote }
    delete noteToFirestore.id;
    
    const newDoc = doc( FirebaseDB, `${ uid }/journal/notes/${ activeNote?.id }` );
    await setDoc(newDoc, noteToFirestore, { merge: true });
    dispatch( updateNote(activeNote! ) )
  }
}

export const startUploadingFiles = ( files:FileList ) => {
  return async (dispatch: Dispatch<AnyAction>) => {
    dispatch( setSaving(true) )
    const fileUploadPromises = [];

    for( const file of files ) {
      fileUploadPromises.push( fileUpload( file) );
    }

    let photoUrls = await Promise.all( fileUploadPromises )
      .catch((error)=> {
        Swal.fire('Atención', error, 'error');
        dispatch( setSaving(false) )
      }) ?? [];

    photoUrls.forEach((value) => {
      if( value === '' ) return;
    })
    
    dispatch( setPhotosToActiveNote( photoUrls ) );
    Swal.fire('¡Buen trabajo!', 'Se subieron las imágenes, sólo falta guardar.', 'success');
  }
}

export const startDeleteNoteById = () => {
  return async (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
    dispatch( setSaving(true) )
    const { uid } = getState().auth;
    const { activeNote:note } = getState().journal;
    const reference = doc(FirebaseDB, `${ uid }/journal/notes/${ note?.id }`);
    await deleteDoc(reference);
    dispatch( deleteNoteById( note! ) )
  }
}