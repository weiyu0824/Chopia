import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'
import { MdAddPhotoAlternate } from 'react-icons/md'
import DataInputBox from '../../components/DataInputBox'
import Avatar from '../../components/Avatar'
import Icon from '../../components/Icon'
import { editProfile } from '../../api/user'
import { validate } from '../../utils/validate'
import { useUserInfoStore } from '../../store/UserInfoStore'
import { Spin } from 'antd';
import { Color } from '../../utils/color'


const Wrapper = styled.div`
  /* flex-grow: 1; */
  height: 100%;
  flex-direction: column;
  justify-content: center;
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
    background-color: ${Color.fagrey};
    color: ${Color.dogrey};
    &:hover{
      background-color: ${Color.yellow};
      color: ${Color.lagrey};
    }
  }

`
interface IProfileSetting {
  currentName: string,
  currentEmail: string,
  currentUsername: string,
  confirmedAvatar: string
  onClickEditAvatar: () => void
}
const ProfileSetting: React.FC<IProfileSetting> = (props) => {
  const [name, setName] = useState(props.currentName)
  const [email, setEmail] = useState(props.currentEmail)
  const [username, setUsername] = useState(props.currentUsername)
  const [nameWarning, setNameWarning] = useState('')
  const startValidation = useRef(false)
  const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])
  const updateName = useUserInfoStore((state) => state.updateName)
  const updateAvatar = useUserInfoStore((state) => state.updateAvatar)
  const [loading, setLoading] = useState(false)

  const handleSubmitProfile = async () => {
    validateName(name)
    startValidation.current = true
    // Check if there still any error then update!
    if (nameWarning === ''){
      console.log('edit')
      setLoading(true)
      const res = await editProfile(name, username, props.confirmedAvatar, cookies.access_token)
      if (res.data.success) {
        console.log('sucessfully update profile')
        updateAvatar(res.data.avatar)
        updateName(res.data.name)
      }
      setLoading(false)
    }
  }

  const validateName = (name: string) => {
    const warning = validate(name, {type: 'name'})
    setNameWarning(warning)
  }

  const handleName = (name: string) => {
    setName(name)
    if (startValidation.current) {
      validateName(name)
    }
  }
  const handleEmail = (email: string) => {
    setEmail(email)
  }
  const handleUsername = (username: string) => {
    setUsername(username)
  }

  if (loading) {
    return (
      <Wrapper>
        <Spin /> 
      </Wrapper>
    )
  } else {
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
              hoverColor={Color.yellow}
            />
          </div>
        </div>
          <DataInputBox 
            id='profile-name'
            data={name}
            dataName='Full name'
            warning={nameWarning}
            handleChange={(name: string)=>{handleName(name)}}
          />
          <DataInputBox 
            id='profile-username'
            data={username}
            dataName='Username'
            warning=''
            handleChange={(username: string)=>{handleUsername(username)}}
            readonly={true}
          />
          <DataInputBox 
            id='profile-email'
            data={email}
            dataName='Email'
            warning=''
            handleChange={(email: string)=>{handleEmail(email)}}
            readonly={true}
          />
          <div 
            id='buttonWrapper'
            onClick={handleSubmitProfile}>
            <button id='submitProfileButton'>Submit</button>
          </div>
      </ Wrapper>
    )
  }

}
export default ProfileSetting