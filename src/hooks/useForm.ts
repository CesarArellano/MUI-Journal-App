import { useMemo } from 'react';
import { useState, useEffect } from 'react';

export const useForm = <T extends Object>( initialState: T, formValidations:any = {}) => {
  const [formState, setFormState] = useState(initialState);
  const [ formValidation, setFormValidation ] = useState<any>({})

  useEffect(() => {
    createValidations();
  }, [formState]);

  // Reinitialize
  useEffect(() => {
    setFormState(initialState)
  }, [initialState])
  
  const isFormValid = useMemo(() => {    
    for( const formValue of Object.keys(formValidation) ) {      
      if( formValidation[formValue] != null ) return false;
    }
    return true;
  }, [formState, formValidation])

  const createValidations = () => {
    const formCheckedValues:any = {};
    for( const formField of Object.keys(formValidations) ) {
      const [ fn, errorMsg ] = formValidations[formField];
      formCheckedValues[`${ formField }Valid`] = fn(formState[formField as keyof T]) ? null : errorMsg;      
    }
    setFormValidation( formCheckedValues );
  }

  const reset = () => {
    setFormState(initialState);
  };

  const handleInputChange = ( value: string, field: keyof T ) => {
    setFormState({
      ...formState,
      [ field ]: value
    });
  };

  return { formState, handleInputChange, reset, formValidation, isFormValid };
}