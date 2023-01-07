import React from 'react'
import { FaBlackTie } from 'react-icons/fa'
import styled from 'styled-components'

interface IBox {
  iconSize: number
  shape: string
  backgroundColor: string
  hoverColor: string
  size: number
  color: string
}

const Box = styled.div<IBox>`
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  border: none;
  border-radius: ${(props) => (props.shape === 'square')? '0.2rem': `${props.size + 1}rem`};
  /* margin: 5px; */
  height: ${(props) => `${props.size + 1}rem`};
  width: ${(props) => `${props.size + 1}rem`};
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => `${props.color}`};
  font-size: ${(props) => `${props.size}rem`};
  vertical-align: center;

  &:hover{
    background-color: ${(props) => props.hoverColor};
  }
`

interface IconProps {
  icon: JSX.Element
  size?: number
  backgroundColor?: string
  shape?: string // round or square
  hoverColor?: string
  color?: string
}

const defaultProps = {
  shape: 'round',
  size: 2,
  backgroundColor: '',
  hoverColor: '',
  color: ''
}

const Icon: React.FC<IconProps> = (options) => {
  const props = {
    ...defaultProps,
    ...options
  }
  return (
    <Box 
      iconSize={props.size}
      shape={props.shape}
      backgroundColor={props.backgroundColor}
      size={props.size}
      hoverColor={props.hoverColor}
      color={props.color}
    > 
      {props.icon}
    </Box>
  )
}

export default Icon