import {Entry} from 'kdbxweb'
import React from 'react'
import {useCallback} from 'react'
import SelectionList from '../../UIComponents/SelectionList/SelectionList'

interface Props {
  entries: Entry[]
  onSelect(entry: Entry): void
}

export default function EntryList({entries, onSelect}: Props) {
  const renderItem = useCallback((entry: Entry) => {
    return entry.fields?.Title ?? '?'
  }, [])

  const getKey = useCallback((entry: Entry) => {
    return entry.uuid.id!
  }, [])

  return (
    <>
      <SelectionList items={entries} onSelect={onSelect} renderItem={renderItem} getKey={getKey} />
    </>
  )
}
