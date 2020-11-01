import {Kdbx} from 'kdbxweb'
import {last, throttle} from 'lodash'
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {ReactNode} from 'react'

interface SessionCtx {
  startSession(filename: string, database: Kdbx, autoClose: false | number): void
  end(): void
  db: Kdbx | null
  filename: string | null
  triggerActivity(): void
}

export const sessionContext = React.createContext<SessionCtx>(null as any)

interface Props {
  withSession: ReactNode
  withoutSession: ReactNode
}

interface Session {
  db: Kdbx | null
  filename: string | null
  autoCloseTimeout?: number | false
}

export default function SessionManager({withSession, withoutSession}: Props) {
  const [session, setSession] = useState<Session>({db: null, filename: null})
  const lastActivity = useRef(new Date())

  const children = session.db ? withSession : withoutSession

  const startSession = useCallback<SessionCtx['startSession']>((filename, db, autoClose) => {
    lastActivity.current = new Date()
    setSession({filename, db, autoCloseTimeout: autoClose})
  }, [])

  const end = useCallback(() => {
    setSession({filename: null, db: null})
  }, [])

  const triggerActivity = useCallback(() => {
    lastActivity.current = new Date()
  }, [])

  useEffect(() => {
    if (!session.autoCloseTimeout) return
    const act = calculateAutoClose(session.autoCloseTimeout, lastActivity.current)
    if (!act) return
    let timeout = setupTimeout()
    return () => clearTimeout(timeout)

    function setupTimeout() {
      const autoClose1 = calculateAutoClose(session.autoCloseTimeout as number, lastActivity.current)
      return setTimeout(function () {
        const newAutoClose = calculateAutoClose(session.autoCloseTimeout as number, lastActivity.current)
        if (newAutoClose <= new Date()) {
          end()
        } else {
          timeout = setupTimeout()
        }
      }, autoClose1.valueOf() - new Date().valueOf())
    }
  }, [end, session])

  const value = useMemo<SessionCtx>(() => ({startSession, ...session, end, triggerActivity}), [
    startSession,
    session,
    end,
    triggerActivity,
  ])

  return <sessionContext.Provider value={value}>{children}</sessionContext.Provider>
}

export function useDB() {
  const db = useContext(sessionContext).db
  if (!db) throw new Error('Cannot use useDB unless a db exists')
  return db
}

export function useRefreshSession() {
  const ctx = useContext(sessionContext)
  if (!ctx) return () => {}
  const trigger = ctx.triggerActivity
  trigger()
  return trigger
}

function calculateAutoClose(autoCloseTimeout: number, lastActivity: Date) {
  return new Date(lastActivity.valueOf() + autoCloseTimeout * 1000)
}
