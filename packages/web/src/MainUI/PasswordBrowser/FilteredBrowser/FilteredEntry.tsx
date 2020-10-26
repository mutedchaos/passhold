import {Entry} from 'kdbxweb'
import React, {useCallback, useContext} from 'react'
import {useMemo} from 'react'
import {useOverlay} from '../../../Overlay'
import SelectionList from '../../../UIComponents/SelectionList/SelectionList'
import EntryDetails from '../DefaultMode/EntryDetails'
import {filterContext} from './FilterContext'
import matchesFilter from './matchesFilter'

interface Props {
  entry: Entry
}
const getKey = () => 'n/a'
export default function FilteredEntry({entry}: Props) {
  const filter = useContext(filterContext)
  const isMatch = useMemo(() => matchesFilter(entry, filter), [entry, filter])
  const items = useMemo(() => [entry], [entry])
  const overlay = useOverlay()
  const handleSelect = useCallback((entry: Entry) => overlay.push(<EntryDetails entry={entry} />), [overlay])
  const renderItem = useCallback((entry: Entry) => entry.fields.Title!.toString(), [])

  if (!isMatch) return null
  return <SelectionList items={items} onSelect={handleSelect} renderItem={renderItem} getKey={getKey} />
}
