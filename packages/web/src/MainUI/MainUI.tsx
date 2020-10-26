import React, {useState} from 'react'
import FilteredBrowser from './PasswordBrowser/FilteredBrowser/FilteredBrowser'
import PasswordBrowser from './PasswordBrowser/PasswordBrowser'
import PasswordFilter from './PasswordFilter'

export default function MainUI() {
  const [filter, setFilter] = useState('')

  return (
    <div>
      <PasswordFilter onFilter={setFilter} />
      {filter ? <FilteredBrowser filter={filter} /> : <PasswordBrowser />}
    </div>
  )
}
