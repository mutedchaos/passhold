import {Group} from 'kdbxweb'
import React, {useCallback} from 'react'
import SelectionList from '../../../UIComponents/SelectionList/SelectionList'

interface Props {
  groups: Group[]
  onSelect(group: Group): void
}

export default function GroupList({groups, onSelect}: Props) {
  const getKey = useCallback((group: Group) => group.uuid.id!, [])
  const renderItem = useCallback((group: Group) => group.name, [])
  return (
    <div>
      <SelectionList items={groups} onSelect={onSelect} renderItem={renderItem} getKey={getKey} />
    </div>
  )
}
