import {Entry, ProtectedValue} from 'kdbxweb'
import React from 'react'
import styled from 'styled-components'
import Masked from '../Masked'

interface Props {
  entry: Entry
}

const Notes = styled.div`
  white-space: pre-pre-line;
`
const Hidden = styled.div`
  display: none;
`

export default function EntryDetails({entry}: Props) {
  const password: ProtectedValue = entry.fields.Password! as any
  return (
    <div>
      <h1>{entry.fields.Title}</h1>
      <Masked>{password.getText()}</Masked>
      <Notes>{entry.fields.Notes?.toString()}</Notes>
      <Hidden>{JSON.stringify({...entry, parentGroup: null}, null, 2)}</Hidden>
    </div>
  )
}
