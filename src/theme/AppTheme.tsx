import { ThemeProvider } from '@emotion/react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { CssBaseline } from '@mui/material'
import { purpleTheme } from './purpleTheme';

interface Props {
  children: ReactJSXElement
}

export const AppTheme = ({ children }:Props) => {
  return (
    <ThemeProvider theme={ purpleTheme }>
      <CssBaseline />
      { children }
    </ThemeProvider>
  )
}
