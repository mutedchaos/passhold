import React from 'react'
import {useCallback, useContext, useEffect, useState} from 'react'
import Loading from '../../Loading'
import {persistenceContext} from '../../model/Persistence'

interface Props {
  filename: string
  data: ArrayBuffer
  onSave(): void
  onCancel(): void
}

export default function FileSaver({filename, data, onSave, onCancel}: Props) {
  const persistence = useContext(persistenceContext)

  const [overwrite, setOverwrite] = useState(false)

  const alreadyExists = persistence.has(filename)

  useEffect(() => {
    if (!alreadyExists || overwrite) {
      persistence.save(filename, data)
      onSave()
    }
  })

  const confirmOverwrite = useCallback(() => {
    setOverwrite(true)
  }, [])
  if (!alreadyExists && !overwrite) return <Loading />
  return (
    <div>
      <h1>{filename} already exists</h1>
      <p>Overwrite?</p>
      <button onClick={confirmOverwrite}>Yes</button>
      <button type="button" onClick={onCancel}>
        No
      </button>
    </div>
  )
}
