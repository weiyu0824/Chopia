import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Color } from '../../../utils/color'
import imageToAdd from '../../../asset/gorilla.png'
import UserInfoPanal from './UserInfoPanal'
import useOnClickOutside from '../../../hook/useOnClickOutside'
import { useAuthStore } from '../../../store/AuthStore'
import { AvatarImgs } from '../../../utils/avatar'

const UserInfoBox = styled.div`
  position: relative;
  flex-grow: 2;
  margin: 0rem 0.2rem;
`

const UserInfoButton = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 0.2rem;
  padding: 0.2rem;

  &:hover{
    background-color: ${Color.lgrey};
    cursor: pointer;
  }

  .avatarBox {
    flex-shrink:0;
    height: 2rem;
    width: 2rem;
    margin: auto 0;

    .avatar {
      width: 100%;
      height: 100%;
    }
  }
  .fullName {
    color: black;
    margin: auto 0;
    padding: 0.2rem;
  }
   
`

const UserInfo: React.FC = () => {
  const [showPanal, setShowPanal] = useState(false)
  const panalRef = useRef<null | HTMLDivElement>(null)
  const email = useAuthStore((state) => state.email)
  const name = useAuthStore((state) => state.name)
  const username = useAuthStore((state) => state.username)
  const avatar = useAuthStore((state) => state.avatar)
  useOnClickOutside(panalRef, () => setShowPanal(false));

  const handleClickInfo = () => {
    console.log('show panal')
    setShowPanal(true)
  }

  return (
    <UserInfoBox>
      <div ref={panalRef}>
        <UserInfoPanal 
          showPanal={showPanal}
          email={email}
          name={name}
          username={username}
          avatar={avatar}/>
      </div>
      <UserInfoButton onClick={handleClickInfo}>
        <div className='avatarBox' >
          <img className='avatar' src={AvatarImgs[avatar]} alt="Image" />
        </div>
        <span className='fullName'> {name} </span>
      </UserInfoButton>
    </UserInfoBox>
  )
}

export default UserInfo