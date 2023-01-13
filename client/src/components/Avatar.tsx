import React from 'react'
import styled from 'styled-components'
import { AvatarImgs, LogoImg } from '../utils/avatar'

interface IBox {
  imgSize: number
  respond: boolean
  withMargin: boolean
}

const Box = styled.div<IBox>`
  flex-shrink: 0;
  display: inline-block;
  margin: ${(props) => (props.withMargin) ? '5px': '0px'};
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
  withMargin?: boolean
  onClick?: () => void
}
const defaultProps = {
  respond: false,
  withMargin: true,
  onClick: () => {}
}
const Avatar: React.FC<IAvatar> = (options) => {
  const props = {
    ...defaultProps,
    ...options
  }
  
  const img = (props.avatarName === 'logo')? (
    <img src={LogoImg} alt='avatar-img' />
  ) : (
    <img src={AvatarImgs[props.avatarName]} alt='avatar-img'/>
  )
  return (
    <Box 
      imgSize={props.size}
      respond={props.respond}
      onClick={props.onClick}
      withMargin={props.withMargin}
    >
      {img}
    </Box>
  )
}

export default Avatar