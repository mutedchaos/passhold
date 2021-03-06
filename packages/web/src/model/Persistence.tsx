import React, {createContext, ReactNode, useCallback, useEffect, useMemo, useState} from 'react'

const masterKey = 'passhold-files'
const subkeyPrefix = 'passhold-file-'

export interface FileInfo {
  filename: string
}

interface Ctx {
  files: FileInfo[]
  has(name: string): boolean
  isEmpty(): boolean
  save(name: string, data: ArrayBuffer): void
  load(name: string): ArrayBuffer
  delete(name: string): void
}

export const persistenceContext = createContext<Ctx>(null as any)

export function PersistenceProvider({children}: {children: ReactNode}) {
  const [files, setFiles] = useState<FileInfo[]>([])
  useEffect(() => setFiles(loadInitialPersistence()), [])

  const has = useCallback<Ctx['has']>(
    (name) => {
      return files.some((f) => f.filename === name)
    },
    [files]
  )

  const save = useCallback<Ctx['save']>(
    (name, data) => {
      const newFiles = has(name) ? files : [...files, {filename: name}]
      persist(name, data, newFiles)
      setFiles(newFiles)
    },
    [files, has]
  )

  const load = useCallback<Ctx['load']>((filename) => {
    return loadFromPersistence(filename)
  }, [])

  const isEmpty = useCallback(() => files.length === 0, [files.length])

  const deleteFile = useCallback(
    (name: string) => {
      const newFiles = files.filter((x) => x.filename !== name)
      unpersist(name, newFiles)
      setFiles(newFiles)
    },
    [files]
  )

  const value = useMemo(() => ({files, has, save, load, isEmpty, delete: deleteFile}), [
    deleteFile,
    files,
    has,
    isEmpty,
    load,
    save,
  ])

  return <persistenceContext.Provider value={value}>{children}</persistenceContext.Provider>
}

function loadInitialPersistence() {
  return JSON.parse(localStorage.getItem(masterKey) ?? '[]')
}

function persist(name: string, data: ArrayBuffer, files: FileInfo[]) {
  localStorage.setItem(subkeyPrefix + name, storeable(data))
  localStorage.setItem(masterKey, JSON.stringify(files))
}
function unpersist(name: string, files: FileInfo[]) {
  localStorage.removeItem(subkeyPrefix + name)
  localStorage.setItem(masterKey, JSON.stringify(files))
}

function storeable(data: ArrayBuffer) {
  const array = new Uint8Array(data)
  return Array(data.byteLength)
    .fill(0)
    .map((_, index) => {
      return array[index].toString(16).padStart(2, '0')
    })
    .join('')
}

function loadFromPersistence(name: string) {
  const rawData = localStorage.getItem(subkeyPrefix + name)
  if (!rawData) throw new Error('Not found')
  const buffer = new ArrayBuffer(rawData.length / 2)
  const array = new Uint8Array(buffer)
  for (let i = 0; i < rawData.length / 2; ++i) {
    array[i] = parseInt(rawData.substr(i * 2, 2), 16)
  }
  return buffer
}
