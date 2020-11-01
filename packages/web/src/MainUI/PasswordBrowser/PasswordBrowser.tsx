import {Group} from 'kdbxweb'
import React, {useCallback, useContext, useState} from 'react'
import {useOverlay} from '../../Overlay'
import {sessionContext, useDB} from '../../SessionManager'
import {useBackButton} from '../../UIComponents/goBackContext'
import GroupDetails from './DefaultMode/GroupDetails'
import GroupList from './DefaultMode/GroupList'
import MaybeLogout from './MaybeLogout'

export default function PasswordBrowser() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const db = useDB()

  const clearSelection = useCallback(() => {
    setSelectedGroup(null)
  }, [])

  const session = useContext(sessionContext)

  const overlay = useOverlay()

  const maybeLogout = useCallback(async () => {
    const {pop} = overlay.push(
      <MaybeLogout
        onCancel={() => pop()}
        onLogout={() => {
          pop()
          session.end()
        }}
      />
    )
  }, [overlay, session])

  useBackButton(maybeLogout)

  if (db.groups.length === 1) {
    return <GroupDetails group={db.groups[0]} onClose={null} />
  }

  if (selectedGroup) {
    return <GroupDetails group={selectedGroup} onClose={clearSelection} />
  }

  return <GroupList groups={db.groups} onSelect={setSelectedGroup} />
}
