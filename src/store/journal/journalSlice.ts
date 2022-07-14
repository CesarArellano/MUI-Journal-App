import { createSlice } from '@reduxjs/toolkit';

export interface NoteProps {
  id?: string;
  title?: string;
  body?: string;
  date?: number,
  imageUrls?: Array<string>
}
interface JournalStateProps {
  isSaving: boolean;
  messageSaved: string;
  notes: Array<NoteProps>;
  activeNote: NoteProps | null;
}

interface AddNewNoteActionProps {
  payload: NoteProps
}

interface SetNotesActionProps {
  payload: Array<NoteProps>
}

interface SavingActionProps {
  payload: boolean
}

interface PhotosActionProps {
  payload: Array<string>
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSaved: '',
    notes: [],
    activeNote: null,
    // activeNote: {
    //   id: 'QWERTY',
    //   title: '',
    //   body: '',
    //   date: 1234567,
    //   imageUrls: [], 
    // }
  } as JournalStateProps,
  reducers: {
    addNewNote: ( state, { payload }: AddNewNoteActionProps ) => {
      state.notes.push( payload );
      state.isSaving = false;
    },
    setActiveNote: (state, { payload }: AddNewNoteActionProps ) => {
      state.activeNote = payload;
      state.messageSaved = '';
    },
    setNotes: (state, { payload }: SetNotesActionProps) => {
      state.notes = payload
    },
    setSaving: (state, { payload }: SavingActionProps) => {
      state.isSaving = payload;
      state.messageSaved = '';
    },
    updateNote: (state, { payload }: AddNewNoteActionProps) => {
      state.isSaving = false;
      state.notes = state.notes.map( note => {
        if( note.id === payload.id ) {
          return payload;
        }
        return note;
      })
      state.messageSaved = `${ payload.title }, actualizada correctamente`;
    },
    setPhotosToActiveNote: (state, { payload }: PhotosActionProps ) => {
      state.isSaving = false;
      if( state.activeNote == null ) return;
      state.activeNote.imageUrls = [ ...(state.activeNote.imageUrls ?? []), ...payload ];
    },
    clearNotesLogout: ( state ) => {
      state.isSaving = false;
      state.messageSaved = '';
      state.notes = [];
      state.activeNote = null;
    },
    deleteNoteById: (state, { payload }: AddNewNoteActionProps) => {
      state.activeNote = null;
      state.isSaving = false;      
      state.notes = state.notes.filter( note => note.id !== payload.id )
      state.messageSaved = `Se eliminó la nota correctamente`;
    },
  }
});


export const {
  addNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  clearNotesLogout,
  deleteNoteById
} = journalSlice.actions;