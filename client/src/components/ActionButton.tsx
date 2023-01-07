import React from 'react'
import styled from 'styled-components'



const AButton  = styled.button<IAButton>`
  margin: ${(props) => `${props.margin}`};
  border: none;
  border-radius: 4px;
  width: ${(props) => `${props.width}`};
  height: ${(props) => `${props.height}`};
  outline: none;
  padding: ${(props) => `${props.padding}`};
  background-color: ${(props) => `${props.backgroundColor}`};
  
  &:hover {
    background-color: ${(props) => (props.allowToAct)? `${props.hoverColor}`: ''};
  }
  cursor: ${(props) => (props.allowToAct)? '': 'not-allowed'} !important;
  
`

interface IAButton {
  margin?: string
  width?: string
  height?: string
  padding?: string
  backgroundColor?: string
  hoverColor?: string
  color?: string
  allowToAct?: boolean
  onClick?: () => void
}
interface IActionButton extends IAButton {
  word?: string
}
const defaultProps = {
  margin: '',
  width: '',
  height: '',
  padding: '',
  backgroundColor: '',
  hoverColor: '',
  color: '',
  allowToAct: true,
  onClick: () => {},
  word: ''
}

const ActionButton: React.FC<IActionButton> =  (options) => {
  const props = {
    ...defaultProps,
    ...options
  }
  const onClick = () => {
    if (props.allowToAct){
      props.onClick()
    }
  }
  return (
    <AButton 
      margin={props.margin}
      width={props.width}
      height={props.height}
      padding={props.padding}
      backgroundColor={props.backgroundColor}
      color={props.color}
      allowToAct={props.allowToAct}
      onClick={onClick}
    > {props.word}</AButton>
  )
}

export default ActionButton
