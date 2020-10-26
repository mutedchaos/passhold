import {Kdbx} from 'kdbxweb'
import React, {useCallback, useContext, useMemo, useState} from 'react'
import {ReactNode} from 'react'

interface SessionCtx {
  startSession(database: Kdbx): void
  db: Kdbx | null
}

export const sessionContext = React.createContext<SessionCtx>(null as any)

interface Props {
  withSession: ReactNode
  withoutSession: ReactNode
}

export default function SessionManager({withSession, withoutSession}: Props) {
  const [session, setSession] = useState<null | Kdbx>(null)

  const children = session ? withSession : withoutSession

  const startSession = useCallback<SessionCtx['startSession']>((db) => {
    setSession(db)
  }, [])

  const value = useMemo<SessionCtx>(() => ({startSession, db: session}), [session, startSession])

  return <sessionContext.Provider value={value}>{children}</sessionContext.Provider>
}

export function useDB() {
  const db = useContext(sessionContext).db
  if (!db) throw new Error('Cannot use useDB unless a db exists')
  return db
}
