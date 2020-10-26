import React from 'react'
import {useDB} from '../../../SessionManager'
import {filterContext} from './FilterContext'
import FilteredGroups from './FilteredGroups'

interface Props {
  filter: string
}

export default function FilteredBrowser({filter}: Props) {
  const db = useDB()
  return (
    <filterContext.Provider value={filter}>
      <FilteredGroups groups={db.groups} />
    </filterContext.Provider>
  )
}
