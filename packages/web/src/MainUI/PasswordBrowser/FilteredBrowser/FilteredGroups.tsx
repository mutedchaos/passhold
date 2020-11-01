import {Group} from 'kdbxweb'
import React from 'react'
import {useCallback} from 'react'
import FilteredGroup from './FilteredGroup'

interface Props {
  groups: Group[]
  path: string[]
}

export default function FilteredGroups({groups, path}: Props) {
  const renderGroup = useCallback((group: Group) => <FilteredGroup path={path} group={group} key={group.uuid.id} />, [
    path,
  ])
  return <>{groups.map(renderGroup)}</>
}
