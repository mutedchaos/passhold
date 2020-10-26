import {Kdbx} from 'kdbxweb'
import React, {useCallback, useContext} from 'react'
import {useOverlay} from '../../Overlay'
import {sessionContext} from '../../SessionManager'
import Authenticate from '../Authenticate/Authenticate'
import FileSaver from './FileSaver'
import UploadForm from './UploadForm'

export default function Upload() {
  const overlay = useOverlay()

  const {startSession} = useContext(sessionContext)

  const handleCloseAuth = useCallback(
    (file: null | Kdbx) => {
      overlay.pop()
      if (file) {
        startSession(file)
      }
    },
    [overlay, startSession]
  )

  const handleUpload = useCallback(
    (file: File, save: boolean) => {
      const fileDataPromise = file.arrayBuffer()

      if (save) {
        overlay.push(
          <FileSaver
            file={file}
            data={fileDataPromise}
            onSave={() => {
              overlay.pop()
              handleUpload(file, false)
            }}
            onCancel={() => overlay.pop()}
          />
        )
      } else {
        overlay.push(<Authenticate to={file.name} data={fileDataPromise} onClose={handleCloseAuth} />)
      }
    },
    [handleCloseAuth, overlay]
  )

  return <UploadForm onUpload={handleUpload} />
}
