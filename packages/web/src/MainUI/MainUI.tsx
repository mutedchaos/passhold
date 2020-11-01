import React, {useCallback, useState} from 'react'
import {useBackButton} from '../UIComponents/goBackContext'
import FilteredBrowser from './PasswordBrowser/FilteredBrowser/FilteredBrowser'
import PasswordBrowser from './PasswordBrowser/PasswordBrowser'
import PasswordFilter from './PasswordFilter'

export default function MainUI() {
  const [filter, setFilter] = useState('')
  const [filterReset, setFilterReset] = useState(0)

  const clearFilter = useCallback(() => {
    setFilterReset((x) => x + 1)
    setFilter('')
  }, [])

  useBackButton(filter ? clearFilter : null)

  return (
    <div>
      <PasswordFilter key={filterReset.toString()} onFilter={setFilter} />
      {filter ? <FilteredBrowser filter={filter} /> : <PasswordBrowser />}
    </div>
  )
}
