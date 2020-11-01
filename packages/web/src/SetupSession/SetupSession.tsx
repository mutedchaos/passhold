import React, {useContext} from 'react'
import styled from 'styled-components'
import {persistenceContext} from '../model/Persistence'
import PagePrompt from '../UIComponents/PagePrompt'
import FileList from './FileList'
import Upload from './Upload/Upload'

export default function SetupSession() {
  const anySaved = !useContext(persistenceContext).isEmpty()
  const prompt = anySaved
    ? 'Welcome! Select an existing file from the list below, or add a new one.'
    : 'Welcome! Add a keepass file to get stated!'
  return (
    <>
      <PagePrompt>{prompt}</PagePrompt>
      <FileList />
      <Upload />
    </>
  )
}
