import { AddOutlined } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material'
import { JournalLayout } from '../layout/JournalLayout';
import { NothingSelectedView, NoteView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/journal/thunks';
export const JournalPage = () => {
  const { isSaving, activeNote } = useSelector<any, any>(state => state.journal);
  const dispatch = useDispatch<any>();

  const onClickNewNote = () =>{
    dispatch( startNewNote() )
  }

  return (
    <JournalLayout>
      <>
        {
          (!!activeNote)
          ? <NoteView />
          : <NothingSelectedView />
        }
        
        <IconButton
          disabled={ isSaving }
          onClick={ onClickNewNote }
          size='large'
          sx={{
            transition: '0.8s all ease-out',
            color: 'white',
            backgroundColor: 'error.main',
            ':hover': {  backgroundColor: 'error.main', opacity: 0.9 },
            position: 'fixed',
            right: 20,
            bottom: 20
          }}
        >
          <AddOutlined sx={{ fontSize: 30 }}/>
        </IconButton>
      </>
    </JournalLayout>
  )
}
