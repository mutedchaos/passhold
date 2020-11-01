import React, {useCallback, useState} from 'react'
import kdbxweb, {Kdbx} from 'kdbxweb'
import Loading from '../../Loading'
import PagePrompt from '../../UIComponents/PagePrompt'
import {useBackButton} from '../../UIComponents/goBackContext'
import {BigButton} from '../../UIComponents/Button'
import styled from 'styled-components'
import LabeledInput from '../../UIComponents/LabeledInput'

interface Props {
  to: string
  data: Promise<ArrayBuffer>
  onClose(db: null | Kdbx): void
  onSave?(name: string, file: File, data: ArrayBuffer): Promise<void>
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export default function Authenticate({to, data, onClose}: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCancel = useCallback(() => onClose(null), [onClose])
  useBackButton(handleCancel)

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
      <PagePrompt>Authenticate to {to}</PagePrompt>
      <div>{error}</div>
      <Form onSubmit={handleSubmit}>
        <div>
          <LabeledInput label={'Password'} type="password" value={password} onChange={handlePasswordChange} autoFocus />
        </div>

        <BigButton>Open</BigButton>
      </Form>
    </div>
  )
}
