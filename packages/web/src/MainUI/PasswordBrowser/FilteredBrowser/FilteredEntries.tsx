import {Entry} from 'kdbxweb'
import React from 'react'
import {useCallback} from 'react'
import FilteredEntry from './FilteredEntry'

interface Props {
  entries: Entry[]
  path: string[]
}

export default function FilteredEntries({entries, path}: Props) {
  const renderEntry = useCallback((entry: Entry) => <FilteredEntry path={path} entry={entry} key={entry.uuid.id} />, [
    path,
  ])
  return <>{entries.map(renderEntry)}</>
}
