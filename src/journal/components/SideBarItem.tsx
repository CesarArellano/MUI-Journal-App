import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { NoteProps } from '../../store/journal/journalSlice';
import { useMemo } from 'react';
import { startSetActiveNote } from '../../store/journal/thunks';
import { useDispatch } from 'react-redux';

interface Props {
  note: NoteProps
}

export const SideBarItem = ({ note }: Props ) => {
  const dispatch = useDispatch<any>();
  const { title = '', body } = note;
  
  const newTitle = useMemo(() => {
    return title.length > 17
      ? title.substring(0, 17) + '...'
      : title;
  }, [title]);
  
  const onActiveNote = () => {
    dispatch( startSetActiveNote(note) )
  }
  
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={ onActiveNote }
      >
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={ newTitle } />
          <ListItemText secondary={ body } />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}
