import {Entry} from 'kdbxweb'
import React from 'react'
import {useCallback} from 'react'
import FilteredEntry from './FilteredEntry'

interface Props {
  entries: Entry[]
}

export default function FilteredEntries({entries}: Props) {
  const renderEntry = useCallback((entry: Entry) => <FilteredEntry entry={entry} key={entry.uuid.id} />, [])
  return <>{entries.map(renderEntry)}</>
}
