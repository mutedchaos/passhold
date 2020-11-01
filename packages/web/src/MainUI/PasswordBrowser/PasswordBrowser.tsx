import {Group} from 'kdbxweb'
import React, {useCallback, useContext, useState} from 'react'
import {sessionContext, useDB} from '../../SessionManager'
import {useConfirm} from '../../UIComponents/ConfirmPopup'
import {useBackButton} from '../../UIComponents/goBackContext'
import GroupDetails from './DefaultMode/GroupDetails'
import GroupList from './DefaultMode/GroupList'

export default function PasswordBrowser() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const db = useDB()

  const clearSelection = useCallback(() => {
    setSelectedGroup(null)
  }, [])

  const session = useContext(sessionContext)

  const confirm = useConfirm()
  const maybeLogout = useCallback(async () => {
    if (await confirm('Close the database?')) {
      session.end()
    }
  }, [confirm, session])

  useBackButton(maybeLogout)

  if (db.groups.length === 1) {
    return <GroupDetails group={db.groups[0]} onClose={null} />
  }

  if (selectedGroup) {
    return <GroupDetails group={selectedGroup} onClose={clearSelection} />
  }

  return <GroupList groups={db.groups} onSelect={setSelectedGroup} />
}
