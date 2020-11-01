import {Entry, Group} from 'kdbxweb'
import React, {useCallback} from 'react'
import {useState} from 'react'
import {useBackButton} from '../../../UIComponents/goBackContext'
import EntryDetails from './EntryDetails'
import EntryList from './EntryList'
import GroupList from './GroupList'

interface Props {
  group: Group
  onClose: null | (() => void)
}

export default function GroupDetails({group, onClose}: Props) {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null)

  const clearSelection = useCallback(() => {
    setSelectedGroup(null)
    setSelectedEntry(null)
  }, [])

  const skipSelf = group.entries.length === 0 && group.groups.length === 1

  useBackButton(skipSelf || selectedGroup || onClose === null ? null : selectedEntry ? clearSelection : onClose)

  if (skipSelf) {
    return <GroupDetails group={group.groups[0]} onClose={onClose} />
  }

  if (selectedEntry) {
    return (
      <>
        <EntryDetails entry={selectedEntry} />
      </>
    )
  }
  if (selectedGroup) {
    return (
      <>
        <GroupDetails group={selectedGroup} onClose={clearSelection} />
      </>
    )
  }

  return (
    <>
      <GroupList groups={group.groups} onSelect={setSelectedGroup} />
      <EntryList entries={group.entries} onSelect={setSelectedEntry} />
    </>
  )
}
