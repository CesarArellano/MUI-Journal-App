import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';
import { NoteProps } from '../store/journal';

export const loadNotes = async ( uid = ''):Promise<Array<NoteProps>>  => {
  const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`);
  const docs = await getDocs(collectionRef)
  const notes: Array<NoteProps> = [];

  docs.forEach( doc => {
    notes.push({ id: doc.id, ...doc.data() } as NoteProps);
  });
  
  return notes;
}
