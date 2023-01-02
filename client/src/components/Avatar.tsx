import React from 'react'
import styled from 'styled-components'
import { AvatarImgs } from '../utils/avatar'

interface IBox {
  imgSize: number
  respond: boolean
}

const Box = styled.div<IBox>`
  flex-shrink: 0;
  display: inline-block;
  margin: 5px;
  cursor: ${(props) => (props.respond) ? 'pointer': ''};
  img {
    width: ${(props) => `${props.imgSize}rem`};
    height: ${(props) => `${props.imgSize}rem`};
  }
  &:hover{
    opacity: ${(props) => (props.respond)? '0.5': '1'};
  }
`

interface IAvatar {
  avatarName: string
  size: number
  respond?: boolean // Dim when mouse over
  onClick?: () => void
}
const defaultProps = {
  respond: false,
  onClick: () => {}
}
const Avatar: React.FC<IAvatar> = (options) => {
  const props = {
    ...defaultProps,
    ...options
  }
  
  return (
    <Box 
      imgSize={props.size}
      respond={props.respond}
      onClick={props.onClick}
    >
      <img src={AvatarImgs[props.avatarName]} alt="Image" />
    </Box>
  )
}

export default Avatar