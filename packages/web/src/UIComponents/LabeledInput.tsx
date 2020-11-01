import React from 'react'
import {ReactNode} from 'react'
import styled from 'styled-components'
import LabeledElement from './LabeledElement'

type Props = {label: ReactNode} & React.InputHTMLAttributes<HTMLInputElement>

const Input = styled.input`
  margin: 5px 20px 10px 10px;
  padding: 10px;
`

export default function LabeledInput({label, ...inputProps}: Props) {
  return (
    <LabeledElement label={label}>
      <Input {...inputProps} />
    </LabeledElement>
  )
}
