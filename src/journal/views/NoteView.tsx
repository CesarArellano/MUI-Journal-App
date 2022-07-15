import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { Grid, Typography, Button, TextField, IconButton, Box } from '@mui/material';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { ImageGallery } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo, SyntheticEvent, useEffect, ChangeEvent, useRef } from 'react';
import { useForm } from '../../hooks';
import { setActiveNote } from '../../store/journal';
import { NoteProps } from '../../store/journal/journalSlice';
import { startSaveNote, startUploadingFiles, startDeleteNoteById } from '../../store/journal/thunks';

export const NoteView = () => {
  const dispatch = useDispatch<any>();
  const { activeNote:note, messageSaved, isSaving } = useSelector<any, any>(state => state.journal);

  const { formState, handleInputChange } = useForm<NoteProps>(note);

  const { title, body } = formState;

  const dateString = useMemo(() => {
    const newDate = new Date(note.date!);
    return newDate.toUTCString();
  }, [note.date]);

  const fileInputRef = useRef<any>();

  useEffect(() => {
    if( messageSaved.length > 0 ) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved])
  
  useEffect(() => {
    dispatch( setActiveNote(formState) )
  }, [formState])

  const onSaveNote = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch( startSaveNote() )
  }
  
  const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { files } = target;
    if( files == null || files?.length === 0 ) return;
    dispatch( startUploadingFiles(files!) );
  }

  const onDeleteNote = () => {
    dispatch( startDeleteNoteById() );
  }

  return (
    <Grid container>
      <Grid
        container
        direction="row"
        alignItems="center"
        sx={{ 
          mb: 2,
          justifyContent: 'space-between',
          "@media (max-width: 1059px)": { justifyContent: 'end' } 
        }}
      >
        <Grid item>
          <Typography variant="h4" fontWeight="light" >{ dateString }</Typography>
        </Grid>
        <Grid item>
          <input 
            type="file"
            accept="image/*"
            ref={ fileInputRef }
            onChange={ onFileInputChange }
            style={{ display: 'none' }}
            multiple
          />
          <IconButton
            color="primary"
            disabled={ isSaving }
            onClick={ () => fileInputRef.current.click() }
            sx={{ mr: 1 }}
          >
            <UploadOutlined />
          </IconButton>
        </Grid>
        
      </Grid>

      <Grid container>
        <TextField 
          type="text"
          value={ title }
          variant='filled'
          fullWidth
          onChange={ ({target}) =>  handleInputChange(target.value, 'title')}
          placeholder='Ingrese un título'
          label="Título"
          sx={{ border: 'none', mb: 1 }}
        />
        <TextField 
          type="text"
          value={ body }
          variant='filled'
          fullWidth
          multiline
          onChange={ ({target}) =>  handleInputChange(target.value, 'body')}
          placeholder='¿Qué sucedió el día de hoy?'
          label="Descripción"
          minRows={ 5 }
        />
      </Grid>
      <Grid container justifyContent="end" sx={{ mt: 1 }} >
        <Button
          variant="contained"
          color="error"
          onClick={ onDeleteNote }
          sx={{ mr: 1 }}
        >
          <DeleteOutline
            sx={{ mr: 1 }}
          />
          Borrar Nota
        </Button>
        <Grid item>
          <Button
            disabled={ isSaving }
            variant="contained"
            onClick={ onSaveNote }  
          >
            <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
            <Typography>Guardar</Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <ImageGallery images={ note.imageUrls } />
      </Grid>
    </Grid>
  )
}
