import {Kdbx} from 'kdbxweb'
import React, {useCallback, useContext, useMemo, useState} from 'react'
import {ReactNode} from 'react'

interface SessionCtx {
  startSession(filename: string, database: Kdbx): void
  end(): void
  db: Kdbx | null
  filename: string | null
}

export const sessionContext = React.createContext<SessionCtx>(null as any)

interface Props {
  withSession: ReactNode
  withoutSession: ReactNode
}

export default function SessionManager({withSession, withoutSession}: Props) {
  const [session, setSession] = useState<{db: Kdbx | null; filename: string | null}>({db: null, filename: null})

  const children = session.db ? withSession : withoutSession

  const startSession = useCallback<SessionCtx['startSession']>((filename, db) => {
    setSession({filename, db})
  }, [])

  const end = useCallback(() => {
    setSession({filename: null, db: null})
  }, [])

  const value = useMemo<SessionCtx>(() => ({startSession, ...session, end}), [session, end, startSession])

  return <sessionContext.Provider value={value}>{children}</sessionContext.Provider>
}

export function useDB() {
  const db = useContext(sessionContext).db
  if (!db) throw new Error('Cannot use useDB unless a db exists')
  return db
}
