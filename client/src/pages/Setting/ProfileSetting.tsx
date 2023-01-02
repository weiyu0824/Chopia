import React, { useState } from 'react'
import styled from 'styled-components'
import { AvatarImgs } from '../../utils/avatar'
import { BsPencilFill } from 'react-icons/bs'
import { MdAddPhotoAlternate } from 'react-icons/md'
import AvatarBoard from './AvatarBoard'
import DataInputBox from '../../components/DataInputBox'
import Avatar from '../../components/Avatar'
import Icon from '../../components/Icon'

const Wrapper = styled.div`
  flex-grow: 1;
  flex-direction: column;
  display: flex;
  margin: 1rem;

  #avatarEditor{
    /* background-color: purple; */
    position: relative;
    padding: 1rem;
    #editAvatarIcon {
      position: absolute;
      top: 68%;
      left: 58%;
    }
  }
  #buttonWrapper{
    margin-top: auto;
  }
  #submitProfileButton{
    border: none;
    border-radius: 0.4rem;
    padding: 0.6rem 1rem;
    outline: none;
    background-color: #0197f6;
    &:hover{
      background-color: lightblue;
    }
  }

`
interface IProfileSetting {
  confirmedAvatar: string
  onClickEditAvatar: () => void
}
const ProfileSetting: React.FC<IProfileSetting> = (props) => {
  const [name, setName] = useState('Anderson')
  const [email, setEmail] = useState('jcab1688@gmail.com')
  const [username, setUsername] = useState('andersonl.0809')
  const [showAvatarBoard, setShowAvatarBoard] = useState(false)


  const handleName = (name: string) => {
    setName(name)
  }
  const handleEmail = (email: string) => {
    setEmail(email)
  }
  const handleUsername = (username: string) => {
    setUsername(username)
  }
  // const handleOnClickEditIcon = () => {
  //   setShowAvatarBoard(true)
  // }
  return (
    <Wrapper>
      <div id='avatarEditor'>
        <Avatar 
          avatarName={props.confirmedAvatar}
          size={10}
        />
        <div id='editAvatarIcon'
        onClick={props.onClickEditAvatar}>
          <Icon 
            icon={<MdAddPhotoAlternate />}
            size={1.5}
            backgroundColor='white'
            hoverColor='lightgrey'
          />
        </div>
      </div>
        <DataInputBox 
          id='profile-name'
          data={name}
          dataName='Full name'
          warning=''
          handleChange={(name: string)=>{handleName(name)}}
        />
        <DataInputBox 
          id='profile-username'
          data={username}
          dataName='Username'
          warning=''
          handleChange={(username: string)=>{handleUsername(username)}}
        />
        <DataInputBox 
          id='profile-email'
          data={email}
          dataName='Email'
          warning=''
          handleChange={(email: string)=>{handleEmail(email)}}
          readonly={true}
        />
        <div id='buttonWrapper'>
          <button id='submitProfileButton'>Submit</button>
        </div>
    </ Wrapper>
  )
  

}
export default ProfileSetting