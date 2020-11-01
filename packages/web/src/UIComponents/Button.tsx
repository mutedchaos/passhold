import styled, {css} from 'styled-components'

export const bigButtonCss = css`
  font-size: 1.2em;
  background: #3a9bbb;
  border-radius: 8px;
  padding: 15px 30px;
  color: white;
  margin: 20px;
  transition: background-color 200ms linear;
  cursor: pointer;
  border: none;
  display: block;

  &:hover {
    background: #5bc4e6;
  }
`

export const BigButton = styled.button`
  ${bigButtonCss}
`
