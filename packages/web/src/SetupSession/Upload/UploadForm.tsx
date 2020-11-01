import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import {bigButtonCss} from '../../UIComponents/Button'
import preventDefault from '../../utils/preventDefault'

interface Props {
  onUpload(file: File & {name: string}): void
}

const UploadLabel = styled.label`
  display: block;
  ${bigButtonCss}

  input {
    display: none;
  }
`

export default function UploadForm({onUpload}: Props) {
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0]
      onUpload(file)
    },
    [onUpload]
  )

  return (
    <div>
      <form onSubmit={preventDefault}>
        <UploadLabel>
          Upload Keepass Database
          <input type="file" onChange={handleFileChange} />
        </UploadLabel>
      </form>
    </div>
  )
}
