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
    (filename: string, db: null | Kdbx, autoClose: false | number) => {
      overlay.pop()
      if (db) {
        startSession(filename, db, autoClose)
      }
    },
    [overlay, startSession]
  )

  const handleSave = useCallback(
    (name: string, data: ArrayBuffer) => {
      let saved = false
      const {done, pop} = overlay.push(
        <FileSaver
          filename={name}
          data={data}
          onSave={() => {
            saved = true
            pop()
          }}
          onCancel={() => pop()}
        />
      )

      return done.then(() => {
        return saved
      })
    },
    [overlay]
  )

  const handleUpload = useCallback(
    (file: File & {name: string}) => {
      const fileDataPromise = file.arrayBuffer()
      overlay.push(
        <Authenticate
          to={file.name}
          data={fileDataPromise}
          onClose={(db, autoClose) => handleCloseAuth(file.name, db, autoClose)}
          onSave={handleSave}
        />
      )
    },
    [handleCloseAuth, handleSave, overlay]
  )

  return <UploadForm onUpload={handleUpload} />
}
