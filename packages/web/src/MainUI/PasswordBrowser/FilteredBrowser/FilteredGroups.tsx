import {Group} from 'kdbxweb'
import React from 'react'
import {useCallback} from 'react'
import FilteredGroup from './FilteredGroup'

interface Props {
  groups: Group[]
}

export default function FilteredGroups({groups}: Props) {
  const renderGroup = useCallback((group: Group) => <FilteredGroup group={group} key={group.uuid.id} />, [])
  return <>{groups.map(renderGroup)}</>
}
