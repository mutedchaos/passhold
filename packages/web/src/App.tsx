import React from 'react'
import MainUI from './MainUI/MainUI'
import {PersistenceProvider} from './model/Persistence'
import OverlayProvider from './Overlay'
import SessionManager from './SessionManager'
import SetupSession from './SetupSession/SetupSession'

export default function App() {
  return (
    <PersistenceProvider>
      <OverlayProvider>
        <SessionManager withSession={<MainUI />} withoutSession={<SetupSession />} />
      </OverlayProvider>
    </PersistenceProvider>
  )
}
