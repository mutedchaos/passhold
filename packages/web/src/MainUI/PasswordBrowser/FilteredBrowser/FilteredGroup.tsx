import {Group} from 'kdbxweb'
import React from 'react'
import FilteredEntries from './FilteredEntries'
import FilteredGroups from './FilteredGroups'

interface Props {
  group: Group
}

export default function FilteredGroup({group}: Props) {
  return (
    <>
      <FilteredGroups groups={group.groups} />
      <FilteredEntries entries={group.entries} />
    </>
  )
}
