import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileSetting from './ProfileSetting'
import PasswordSetting from './PasswordSetting'
import { AiTwotoneSetting } from 'react-icons/ai'
import Icon from '../../components/Icon'
import AvatarBoard from './AvatarBoard'
import { useUserInfoStore } from '../../store/UserInfoStore'


interface IPanal {
  width: number
  height: number
}
const Panal = styled.div<IPanal>`
  position: absolute;
  top: ${(props) => `calc(50% - ${props.height / 2}rem)`};
  left: ${(props) => `calc(50% - ${props.width / 2}rem)`};
  flex-direction: column;
  display: flex;
  padding: 2rem;
  border: solid black;
  border-radius: 0.5rem;
  width: ${(props) => `${props.width}rem`};
  height: ${(props) => `${props.height}rem`};
  background-color: white;

  #settingTitle{
    flex-direction: row;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    text-align: left;
    h2{
      display: inline-block;
      margin: auto 0;
    }
  }
`

const Container = styled.div`
  flex-grow: 2;
  flex-direction: row;
  display: flex;
  background-color: lightpink;

  .settingNav{
    flex-grow: 0;
    flex-shrink: 0;
    width: 15rem;
    background-color: #f8efef;
    
  }
`

interface INavButton {
  selected: boolean
}
const NavButton = styled.button<INavButton>`
  border: none;
  width: 100%;
  padding: 0.5rem;
  outline: none;
  background-color: ${(props) => (props.selected)? 'lightgray': '#f8efef'};
  text-align: left;
`

const SettingPanel: React.FC = () => {
  const name = useUserInfoStore((state) => state.name)
  const username = useUserInfoStore((state) => state.username)
  const email = useUserInfoStore((state) => state.email)
  const avatar = useUserInfoStore((state) => state.avatar)
  const [pageIndex, setPageIndex] = useState(0)
  const [showAvatarBoard, setShowAvatarBoard] = useState(false)
  const [confirmedAvatar, setConfirmedAvatar] = useState(avatar)

  const changePageIndex = (index: number) => {
    console.log(index)
    setPageIndex(index)
  }
  const pageNames = ['Edit Profile', 'Chagne Password']
  const navButtons = pageNames.map((pageName, index) => {
    return <NavButton 
              selected={index === pageIndex}
              key={index} 
              onClick={() => changePageIndex(index)}>
              {pageName}
            </NavButton>
  })

  const handleOnClickEditIcon = () => {
    setShowAvatarBoard(true)
  }
  const handleConfirmAvatar = (choice: string) => {
    if(choice !== ''){
      setConfirmedAvatar(choice)
    }
    setShowAvatarBoard(false)
  }

  if (showAvatarBoard) {
    return <AvatarBoard onFinishSelection={handleConfirmAvatar}/>
  } else {
    let settingPage = <></>
    if (pageIndex === 0) {
      settingPage = (
        <ProfileSetting 
          currentName={name}
          currentEmail={email}
          currentUsername={username}
          confirmedAvatar={confirmedAvatar}
          onClickEditAvatar={handleOnClickEditIcon}/>
      )
    } else if (pageIndex === 1) {
      settingPage = <PasswordSetting />
    }
    return (    
      <Panal width={50} height={38}>
        <div id='settingTitle'>
          <Icon
            icon={<AiTwotoneSetting />}
            size={2}
          />
          <h2>Setting</h2>
        </div>
        <Container>
          <div className='settingNav'>
            {navButtons}
          </div>
            {settingPage}
        </Container>
      </Panal>
    ) 
  }
}

export default SettingPanel