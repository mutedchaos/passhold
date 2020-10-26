import {Group} from 'kdbxweb'
import React, {useCallback, useState} from 'react'
import {useDB} from '../../SessionManager'
import GroupDetails from './DefaultMode/GroupDetails'
import GroupList from './DefaultMode/GroupList'

export default function PasswordBrowser() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const db = useDB()

  const clearSelection = useCallback(() => {
    setSelectedGroup(null)
  }, [])

  if (selectedGroup) {
    return <GroupDetails group={selectedGroup} onClose={clearSelection} />
  }

  return <GroupList groups={db.groups} onSelect={setSelectedGroup} />
}
