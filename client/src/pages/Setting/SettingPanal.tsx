import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileSetting from './ProfileSetting'
import PasswordSetting from './PasswordSetting'
import { AiTwotoneSetting } from 'react-icons/ai'
import Icon from '../../components/Icon'
import AvatarBoard from './AvatarBoard'
import { useUserInfoStore } from '../../store/UserInfoStore'
import { Color } from '../../utils/color'


interface IPanal {
  width: number
  height: number
}
const Panal = styled.div<IPanal>`
  position: absolute;
  top: ${(props) => `calc(50% - ${props.height / 2}rem)`};
  left: ${(props) => `calc(50% - ${props.width / 2}rem)`};
  flex-direction: row;
  display: flex;
  border-radius: 5px;
  width: ${(props) => `${props.width}rem`};
  height: ${(props) => `${props.height}rem`};
  background-color: ${Color.fagrey};

  .settingNav{
    padding: 20px 0;
    #settingTitle{
      flex-direction: row;
      display: flex;
      align-items: center;
      color: ${Color.dogrey};
      h2{
        margin: auto 0;
        color: ${Color.dogrey};
      }
    }
  }
  .settingMain{
    flex-grow: 1;
    border-radius: 0 5px 5px 0;
    padding: 20px 0 50px 0;
    background-color: ${Color.regrey};
    color: ${Color.lagrey};
  }
`

interface INavButton {
  selected: boolean
}
const NavButton = styled.button<INavButton>`
  border: none;
  width: 100%;
  padding: 10px;
  outline: none;
  background-color: ${(props) => (props.selected)? Color.migrey: Color.fagrey};
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
      <Panal width={45} height={38}>
        <div className='settingNav'>
          <div id='settingTitle'>
              <Icon
                icon={<AiTwotoneSetting />}
                size={2}
              />
              <h2>Setting</h2>
            </div>
            {navButtons}
          </div>
        <div className='settingMain'>
          {settingPage}
        </div>
      </Panal>
    ) 
  }
}

export default SettingPanel