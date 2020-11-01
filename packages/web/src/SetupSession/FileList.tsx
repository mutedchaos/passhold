import React from 'react'
import {useCallback, useContext} from 'react'
import styled from 'styled-components'
import {persistenceContext, FileInfo} from '../model/Persistence'
import {useOverlay} from '../Overlay'
import {sessionContext} from '../SessionManager'
import {useConfirm} from '../UIComponents/ConfirmPopup'
import SelectionList from '../UIComponents/SelectionList/SelectionList'
import Authenticate from './Authenticate/Authenticate'

const Item = styled.div`
  display: flex;
  > span {
    flex-grow: 1;
  }
`
const DeleteButton = styled.button`
  color: darkred;
  background: transparent;
  border: none;
  transition: color 300ms linear;
  &:hover {
    color: red;
  }
`

export default function FileList() {
  const persistence = useContext(persistenceContext)
  const session = useContext(sessionContext)
  const overlay = useOverlay()

  const confirm = useConfirm()

  const promptToDelete = useCallback(
    async (filename: string) => {
      if (await confirm('Are you sure you want to delete ' + filename + '?')) {
        persistence.delete(filename)
      }
    },
    [confirm, persistence]
  )

  const renderItem = useCallback(
    (item: FileInfo) => {
      return (
        <Item>
          <span>{item.filename}</span>
          <DeleteButton
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              return promptToDelete(item.filename)
            }}
          >
            X
          </DeleteButton>
        </Item>
      )
    },
    [promptToDelete]
  )

  const getKey = useCallback((item: FileInfo) => {
    return item.filename
  }, [])

  const handleFileSelection = useCallback(
    (file: FileInfo) => {
      const fileDataPromise = Promise.resolve(persistence.load(file.filename))
      const {pop} = overlay.push(
        <Authenticate
          to={file.filename}
          data={fileDataPromise}
          onClose={(db, autoClose) => {
            pop()
            if (db) {
              session.startSession(file.filename, db, autoClose)
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
