import React, {useCallback, useState} from 'react'
import kdbxweb, {Kdbx} from 'kdbxweb'
import Loading from '../../Loading'
import PagePrompt from '../../UIComponents/PagePrompt'
import {useBackButton} from '../../UIComponents/goBackContext'
import {BigButton} from '../../UIComponents/Button'
import styled from 'styled-components'
import LabeledInput from '../../UIComponents/LabeledInput'
import Checkbox from '../../UIComponents/Checkbox'

interface Props {
  to: string
  data: Promise<ArrayBuffer>

  onClose(db: null | Kdbx, autoClose: number | false): void
  onSave?(name: string, data: ArrayBuffer): Promise<boolean>
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const InactivityInput = styled.input`
  width: 40px;
  margin-left: 30px;
`

export default function Authenticate({to, data, onClose, onSave}: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [save, setSave] = useState(false)
  const [autoClose, setAutoClose] = useState(true)
  const [autoCloseMinutes, setAutoCloseMinutes] = useState(15)

  const handleCancel = useCallback(() => onClose(null, false), [onClose])
  useBackButton(handleCancel)

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), [])
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const credentials = new kdbxweb.Credentials(kdbxweb.ProtectedValue.fromString(password), null)
      try {
        setLoading(true)
        const loadedData = await data
        const db = await kdbxweb.Kdbx.load(loadedData, credentials)
        if (save && onSave) {
          if (!(await onSave(to, loadedData))) {
            return
          }
        }
        onClose(db, autoClose && autoCloseMinutes)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    },
    [autoClose, autoCloseMinutes, data, onClose, onSave, password, save, to]
  )
  const handleChangeAutoCloseMinutes = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAutoCloseMinutes(+e.target.value)
  }, [])
  if (loading) return <Loading />
  return (
    <div>
      <PagePrompt>Authenticate to {to}</PagePrompt>
      <div>{error}</div>
      <Form onSubmit={handleSubmit}>
        <div>
          <LabeledInput label={'Password'} type="password" value={password} onChange={handlePasswordChange} autoFocus />
        </div>
        {!!onSave && (
          <Checkbox checked={save} onChange={setSave}>
            Save to browser for future use
          </Checkbox>
        )}
        <Checkbox checked={autoClose} onChange={setAutoClose}>
          Close automatically after inactivity
        </Checkbox>
        <div>
          <InactivityInput
            disabled={!autoClose}
            type="number"
            value={autoCloseMinutes}
            onChange={handleChangeAutoCloseMinutes}
          />{' '}
          minutes
        </div>

        <BigButton>Open</BigButton>
      </Form>
    </div>
  )
}
