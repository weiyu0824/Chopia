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
  color: ${(props) => `${props.color}`};
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
  word: string
}


const ActionButton: React.FC<IActionButton> =  ({
  word,
  margin ='',
  width='',
  height='',
  padding='',
  backgroundColor='',
  hoverColor='red',
  color='',
  allowToAct=true,
  onClick=(() =>{})
}) => {

  const onAct = () => {
    if (allowToAct){
      console.log('click Abutton')
      onClick()
      console.log(hoverColor)
    }
  }
  return (
    <AButton 
      margin={margin}
      width={width}
      height={height}
      padding={padding}
      backgroundColor={backgroundColor}
      color={color}
      hoverColor={hoverColor}
      allowToAct={allowToAct}
      onClick={onAct}
    > {word}</AButton>
  )
}

export default ActionButton
