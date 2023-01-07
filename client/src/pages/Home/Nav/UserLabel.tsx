import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Color } from '../../../utils/color'
import UserInfoPanal from './UserInfoPanal'
import useOnClickOutside from '../../../hook/useOnClickOutside'
import { useUserInfoStore } from '../../../store/UserInfoStore'
import Avatar from '../../../components/Avatar'

const Wrapper = styled.div`
  position: relative;
  flex-grow: 2;
  margin: 0rem 0.2rem;
`

const UserInfoButton = styled.div`
  flex-direction: row;
  display: flex;
  border-radius: 0.2rem;
  padding: 0.2rem;

  &:hover{
    background-color: ${Color.lgrey};
    cursor: pointer;
  }
  .fullName {
    color: black;
    margin: auto 0;
    padding: 0rem 1rem;
  }
`

const UserLabel: React.FC = () => {
  const [showPanal, setShowPanal] = useState(false)
  const panalRef = useRef<null | HTMLDivElement>(null)
  const email = useUserInfoStore((state) => state.email)
  const name = useUserInfoStore((state) => state.name)
  const username = useUserInfoStore((state) => state.username)
  const avatar = useUserInfoStore((state) => state.avatar)
  useOnClickOutside(panalRef, () => setShowPanal(false));

  const handleClickInfo = () => {
    console.log('show panal')
    setShowPanal(true)
  }

  return (
    <Wrapper>
      <div ref={panalRef}>
        <UserInfoPanal 
          showPanal={showPanal}
          email={email}
          name={name}
          username={username}
          avatar={avatar}/>
      </div>
      <UserInfoButton onClick={handleClickInfo}>
        <Avatar 
          avatarName={avatar}
          size={2}
          withMargin={false}
        />
        <span className='fullName'> {name} </span>
      </UserInfoButton>
    </Wrapper>
  )
}

export default UserLabel