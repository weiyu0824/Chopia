import React, { useState } from 'react'
import styled from 'styled-components'
import { Color } from '../../utils/color'
import { AvatarImgs } from '../../utils/avatar'
import Avatar from '../../components/Avatar'
import { BiArrowBack } from 'react-icons/bi'
import { GrCheckmark } from 'react-icons/gr'
import Icon from '../../components/Icon'
import { propTypes } from 'react-bootstrap/esm/Image'

interface IWrapper {
  width: number;
  height: number
}
const Wrapper = styled.div<IWrapper>`
  position: absolute;
  top: ${(props) => `calc(50% - ${props.height / 2}rem)`};
  left: ${(props) => `calc(50% - ${props.width / 2}rem)`};
  flex-direction: column;
  display: flex;
  border-radius: 0.4rem;
  width: ${(props) => `${props.width}rem`};
  height: ${(props) => `${props.height}rem`};
  padding: 1rem;
  background-color: lightgray;
  text-align: center;
#backSettingIcon{
    position: absolute;
  }
  #confirmAvatarIcon{
    position: absolute;
    top: 40%;
    left: 50%;
  }
  #selectedAvatarBox{
    text-align: center;
    border-bottom: solid white;
    padding: 2rem;
  }
  #avatarCarousal{
    text-align:left;
    padding: 1rem;
    overflow-y: scroll;
  }
`

interface IAvatarBoard {
  onFinishSelection: (choice: string) => void
}
const AvatarBoard: React.FC<IAvatarBoard> = (props) => {
  const [selectedAvatar, setSelectedAvatar] = useState('fox')
  const [confirmed, setConfirmed] = useState(false)

  const handleChooseAvatar = (avatarName: string) => {
    setSelectedAvatar(avatarName)
    setConfirmed(false)
  }
  const handleGoBackSetting = () => {
    if (confirmed) {
      props.onFinishSelection(selectedAvatar)
    }else {
      props.onFinishSelection('')
    }
  }
  const handleConfirmChoice = () =>{
    setConfirmed(!confirmed)
  }
  const avatars = Object.keys(AvatarImgs).map((name, index) => {
    return (
      <Avatar 
        key={index} 
        avatarName={name} 
        size={5}
        respond={true}
        onClick={() => handleChooseAvatar(name)}
      />
    )
  })
  return (    
      <Wrapper width={40} height={30}>
        <div 
          id='backSettingIcon'
          onClick={handleGoBackSetting}>
          <Icon
            icon={<BiArrowBack />}
            backgroundColor='white'
            hoverColor='pink'
            size={1.5}
            shape='round'
          />
        </div>
        <div 
          id='confirmAvatarIcon'
          onClick={handleConfirmChoice}
         >
          <Icon
            icon={<GrCheckmark />}
            backgroundColor={(confirmed)? 'pink': 'white'}
            size={1.5}
            shape='round'
          />
        </div>
        <h4>Change your avatar</h4> 
        <div id='selectedAvatarBox'>
          <Avatar 
            avatarName={selectedAvatar}
            size={8}
          />
        </div>
        <div id='avatarCarousal'>
          {avatars}
        </div>
      </Wrapper>
  )
}

export default AvatarBoard