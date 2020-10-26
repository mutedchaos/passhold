import React, {useCallback, useState} from 'react'
import kdbxweb, {Kdbx} from 'kdbxweb'
import Loading from '../../Loading'

interface Props {
  to: string
  data: Promise<ArrayBuffer>
  onClose(db: null | Kdbx): void
}

export default function Authenticate({to, data, onClose}: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCancel = useCallback(() => onClose(null), [onClose])

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [])
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(password), null)
      try {
        setLoading(true)
        const db = await kdbxweb.Kdbx.load(await data, credentials)
        onClose(db)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    },
    [data, onClose, password]
  )
  if (loading) return <Loading />
  return (
    <div>
      <h1>Authenticate to {to}</h1>
      <div>{error}</div>
      <form onSubmit={handleSubmit}>
        <div>
          Password <input type="password" value={password} onChange={handlePasswordChange} autoFocus />
        </div>
        <button>Open</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  )
}
