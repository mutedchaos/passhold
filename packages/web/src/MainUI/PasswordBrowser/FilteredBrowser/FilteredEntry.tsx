import {Entry} from 'kdbxweb'
import React, {useCallback, useContext, useMemo} from 'react'
import {useOverlay} from '../../../Overlay'
import LabeledElement from '../../../UIComponents/LabeledElement'
import SelectionList from '../../../UIComponents/SelectionList/SelectionList'
import EntryDetailsOverlay from '../EntryDetailsOverlay'
import {filterContext} from './FilterContext'
import matchesFilter from './matchesFilter'

interface Props {
  entry: Entry
  path: string[]
}
const getKey = () => 'n/a'
export default function FilteredEntry({entry, path}: Props) {
  const filter = useContext(filterContext)
  const isMatch = useMemo(() => matchesFilter(entry, filter), [entry, filter])
  const items = useMemo(() => [entry], [entry])
  const title = entry.fields.Title!.toString()
  const overlay = useOverlay()
  const handleSelect = useCallback((entry: Entry) => overlay.push(<EntryDetailsOverlay entry={entry} />), [overlay])
  const renderItem = useCallback(() => <LabeledElement label={[...path, title].join(' / ')}>{title}</LabeledElement>, [
    path,
    title,
  ])

  if (!isMatch) return null
  return <SelectionList items={items} onSelect={handleSelect} renderItem={renderItem} getKey={getKey} />
}
