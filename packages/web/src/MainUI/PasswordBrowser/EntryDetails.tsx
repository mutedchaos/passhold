import {Entry, ProtectedValue} from 'kdbxweb'
import React from 'react'
import Masked from './Masked'

interface Props {
  entry: Entry
}

export default function EntryDetails({entry}: Props) {
  const password: ProtectedValue = entry.fields.Password! as any
  return (
    <div>
      <h1>{entry.fields.Title}</h1>
      <Masked>{password.getText()}</Masked>
    </div>
  )
}
