import {Entry, ProtectedValue} from 'kdbxweb'
import React from 'react'
import styled from 'styled-components'
import LabeledElement from '../../../UIComponents/LabeledElement'
import MaybeMasked from '../MaybeMasked'

interface Props {
  entry: Entry
}

const Notes = styled.div`
  white-space: pre-pre-line;
`

const handledFields = ['Password', 'UserName', 'Notes']

export default function EntryDetails({entry}: Props) {
  const password: ProtectedValue = entry.fields.Password! as any
  const username: ProtectedValue = entry.fields.UserName! as any

  return (
    <div>
      <h1>{entry.fields.Title}</h1>
      {username && (
        <LabeledElement label="Username">
          <MaybeMasked>{username}</MaybeMasked>
        </LabeledElement>
      )}

      <LabeledElement label="Password">
        <MaybeMasked>{password}</MaybeMasked>
      </LabeledElement>
      <Notes>{entry.fields.Notes?.toString()}</Notes>
      {Object.keys(entry.fields)
        .filter(nonHandled)
        .map((fieldName) => {
          const value: any = entry.fields[fieldName]
          if (!value.getText?.() || value.toString()) return null
          return (
            <LabeledElement label={fieldName} key={fieldName}>
              <MaybeMasked>{value}</MaybeMasked>
            </LabeledElement>
          )
        })}
    </div>
  )
}

function nonHandled(key: string) {
  return !handledFields.includes(key)
}
