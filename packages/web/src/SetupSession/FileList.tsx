import React from 'react'
import {useCallback, useContext} from 'react'
import {persistenceContext, FileInfo} from '../model/Persistence'
import {useOverlay} from '../Overlay'
import {sessionContext} from '../SessionManager'
import SelectionList from '../UIComponents/SelectionList/SelectionList'
import Authenticate from './Authenticate/Authenticate'

export default function FileList() {
  const persistence = useContext(persistenceContext)
  const session = useContext(sessionContext)
  const overlay = useOverlay()

  const renderItem = useCallback((item: FileInfo) => {
    return <div>{item.filename}</div>
  }, [])

  const getKey = useCallback((item: FileInfo) => {
    return item.filename
  }, [])

  const handleFileSelection = useCallback(
    (file: FileInfo) => {
      const fileDataPromise = Promise.resolve(persistence.load(file.filename))
      const {pop} = overlay.push(
        <Authenticate
          allowSave={false}
          to={file.filename}
          data={fileDataPromise}
          onClose={(db) => {
            pop()
            if (db) {
              session.startSession(file.filename, db)
            }
          }}
        />
      )
    },
    [overlay, persistence, session]
  )

  return (
    <SelectionList items={persistence.files} renderItem={renderItem} getKey={getKey} onSelect={handleFileSelection} />
  )
}
