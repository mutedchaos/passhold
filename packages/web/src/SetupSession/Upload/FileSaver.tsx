import React from 'react'
import {useCallback, useContext, useEffect, useState} from 'react'
import Loading from '../../Loading'
import {persistenceContext} from '../../model/Persistence'

interface Props {
  file: File
  data: Promise<ArrayBuffer>
  onSave(): void
  onCancel(): void
}

export default function FileSaver({file, data, onSave, onCancel}: Props) {
  const persistence = useContext(persistenceContext)

  const [loadedFile, setLoadedFile] = useState<null | ArrayBuffer>(null)
  const [overwrite, setOverwrite] = useState(false)

  useEffect(() => {
    data.then((data) => setLoadedFile(data))
  }, [data])

  const alreadyExists = persistence.has(file.name)

  useEffect(() => {
    if (loadedFile && (!alreadyExists || overwrite)) {
      persistence.save(file.name, loadedFile)
      onSave()
    }
  })

  const confirmOverwrite = useCallback(() => {
    setOverwrite(true)
  }, [])
  if (!alreadyExists && !overwrite) return <Loading />
  return (
    <div>
      <h1>{file.name} already exists</h1>
      <p>Overwrite?</p>
      <button onClick={confirmOverwrite}>Yes</button>
      <button type="button" onClick={onCancel}>
        No
      </button>
    </div>
  )
}
