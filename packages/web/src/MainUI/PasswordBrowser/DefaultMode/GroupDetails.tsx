import {Entry, Group} from 'kdbxweb'
import React, {useCallback} from 'react'
import {useState} from 'react'
import EntryDetails from './EntryDetails'
import EntryList from './EntryList'
import GoBackButton from './GoBackButton'
import GroupList from './GroupList'

interface Props {
  group: Group
  onClose(): void
}

export default function GroupDetails({group, onClose}: Props) {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null)
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null)

  const clearSelection = useCallback(() => {
    setSelectedGroup(null)
    setSelectedEntry(null)
  }, [])

  if (selectedEntry) {
    return (
      <>
        <GoBackButton onClick={clearSelection} />
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
      <GoBackButton onClick={onClose} />
      <GroupList groups={group.groups} onSelect={setSelectedGroup} />
      <EntryList entries={group.entries} onSelect={setSelectedEntry} />
    </>
  )
}
