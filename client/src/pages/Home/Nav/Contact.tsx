import React, { useState } from 'react'
import styled from 'styled-components'
import { Color } from '../../../utils/color'
import { AvatarImgs } from '../../../utils/avatar'
import { useNavigate, useParams } from 'react-router-dom'

interface IContactBox {
  pick: boolean
}
const ContactBox = styled.div<IContactBox>`
  display: flex;
  flex-direction: row;
  margin: 3px 0;
  border-radius: 0.2rem;
  padding: 0.2rem;
  /* border-radius: 0.1rem; */
  background-color: ${(props) => (props.pick)? `${Color.lblue}`: ''};
  color: ${Color.lgrey};
  &:hover{
    background-color: ${Color.lblue};
    cursor: pointer;
  }

  .avatarBox {
    flex-shrink:0;
    height: 2rem;
    width: 2rem;
    margin: 0px 15px 0px 0px;

    .avatar {
      width: 100%;
      height: 100%;
    }
  }
  .fullName {
    margin: auto 0;
  }

`
interface IContact {
  contactId: string
  name: string
  username: string
  avatar: string
}
const Contact: React.FC<IContact> = (props) => {
  const params = useParams()
  const navigate = useNavigate()

  const clickContact = () => {
    navigate(`/inbox/${props.contactId}`)
  }
  return (
    <ContactBox 
      pick={props.contactId === params.friendId}
      onClick={clickContact}>
      <div className='avatarBox'>
        <img className='avatar' src={AvatarImgs[props.avatar]} alt="Image"/>
      </div>
      <span className='fullName'> {props.name} </span>
      
    </ContactBox>
  )
}

export default Contact