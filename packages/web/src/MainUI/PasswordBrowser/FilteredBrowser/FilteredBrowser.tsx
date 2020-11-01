import React from 'react'
import {useDB, useRefreshSession} from '../../../SessionManager'
import {filterContext} from './FilterContext'
import FilteredGroups from './FilteredGroups'

interface Props {
  filter: string
}

const emptyPath: string[] = []
export default function FilteredBrowser({filter}: Props) {
  useRefreshSession()
  const db = useDB()
  return (
    <filterContext.Provider value={filter}>
      <FilteredGroups groups={db.groups} path={emptyPath} />
    </filterContext.Provider>
  )
}
