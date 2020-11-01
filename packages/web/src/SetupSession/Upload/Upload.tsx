import {Kdbx} from 'kdbxweb'
import React, {useCallback, useContext, useState} from 'react'
import {useOverlay} from '../../Overlay'
import {sessionContext} from '../../SessionManager'
import Authenticate from '../Authenticate/Authenticate'
import FileSaver from './FileSaver'
import UploadForm from './UploadForm'

export default function Upload() {
  const overlay = useOverlay()

  const {startSession} = useContext(sessionContext)

  const handleCloseAuth = useCallback(
    (filename: string, db: null | Kdbx) => {
      overlay.pop()
      if (db) {
        startSession(filename, db)
      }
    },
    [overlay, startSession]
  )

  const handleSave = useCallback(
    (name: string, file: File, data: ArrayBuffer) => {
      const {done, pop} = overlay.push(
        <FileSaver
          file={file}
          data={data}
          onSave={() => {
            pop()
          }}
          onCancel={() => pop()}
        />
      )
      return done
    },
    [overlay]
  )

  const handleUpload = useCallback(
    (file: File & {name: string}) => {
      const fileDataPromise = file.arrayBuffer()
      overlay.push(
        <Authenticate
          allowSave={true}
          to={file.name}
          data={fileDataPromise}
          onClose={(db) => handleCloseAuth(file.name, db)}
          onSave={handleSave}
        />
      )
    },
    [handleCloseAuth, handleSave, overlay]
  )

  return <UploadForm onUpload={handleUpload} />
}
