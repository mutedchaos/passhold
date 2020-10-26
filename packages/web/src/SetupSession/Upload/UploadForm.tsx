import React, {useCallback, useState} from 'react'

interface Props {
  onUpload(file: File, save: boolean): void
}

export default function UploadForm({onUpload}: Props) {
  const [file, setFile] = useState<null | File>(null)
  const [save, setSave] = useState(false)
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!file) throw new Error('Internal error')
      onUpload(file, save)
    },
    [file, onUpload, save]
  )

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    setFile(file)
  }, [])

  const handleToggleSave = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSave(e.target.checked)
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          Keepass file
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>
            <input type="checkbox" onChange={handleToggleSave} />
            Save for future use
          </label>
        </div>
        <button disabled={!file}>Open</button>
      </form>
    </div>
  )
}
