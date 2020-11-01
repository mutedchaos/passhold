import React, {useContext} from 'react'
import styled from 'styled-components'
import {sessionContext} from '../SessionManager'
import GenericBackButton from './GenericBackButton'

const Container = styled.header`
  background: #509696;
  color: white;
  font-size: 24px;
  padding: 8px;
  margin: 0;
  text-shadow: 0px 2px green;
  display: flex;
`

const Title = styled.span`
  margin-left: 20px;
  flex-grow: 1;
`

const Filename = styled.span`
  font-size: 12px;
`

export default function Header() {
  const {filename} = useContext(sessionContext) ?? {filename: null}
  return (
    <Container>
      <GenericBackButton />
      <Title>Passhold</Title>
      <Filename>{filename}</Filename>
    </Container>
  )
}
