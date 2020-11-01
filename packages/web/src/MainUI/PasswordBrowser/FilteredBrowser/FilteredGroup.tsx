import {Group} from 'kdbxweb'
import React, {useMemo} from 'react'
import FilteredEntries from './FilteredEntries'
import FilteredGroups from './FilteredGroups'

interface Props {
  group: Group
  path: string[]
}

export default function FilteredGroup({group, path}: Props) {
  const childPath = useMemo(() => [...path, group.name.toString()], [group.name, path])
  return (
    <>
      <FilteredGroups groups={group.groups} path={childPath} />
      <FilteredEntries entries={group.entries} path={childPath} />
    </>
  )
}
