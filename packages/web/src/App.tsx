import React from 'react'
import {createGlobalStyle} from 'styled-components'
import MainUI from './MainUI/MainUI'
import {PersistenceProvider} from './model/Persistence'
import OverlayProvider from './Overlay'
import SessionManager from './SessionManager'
import SetupSession from './SetupSession/SetupSession'
import MainLayout from './UIComponents/MainLayout'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,500;0,600;1,300;1,600&display=swap');
  body {
    font-family: 'Montserrat', sans-serif;
    padding: 0; 
    margin: 0;
  }
`

export default function App() {
  return (
    <PersistenceProvider>
      <OverlayProvider>
        <GlobalStyles />

        <SessionManager
          withSession={
            <MainLayout>
              <MainUI />
            </MainLayout>
          }
          withoutSession={
            <MainLayout>
              <SetupSession />
            </MainLayout>
          }
        />
      </OverlayProvider>
    </PersistenceProvider>
  )
}
