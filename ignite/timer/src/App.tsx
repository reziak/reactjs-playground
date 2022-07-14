import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/themes/default'
import { Router } from './Router'
import { GlobalStyle } from './global'
import { CyclesContextProvider } from './contexts/CyclesContext'

export const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <CyclesContextProvider>
        <Router />
      </CyclesContextProvider>
    </ThemeProvider>
  )
}
