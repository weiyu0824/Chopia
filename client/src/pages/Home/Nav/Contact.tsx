import React from 'react'
import styled from 'styled-components'
import { Color } from '../../../utils/color'
import { useNavigate, useParams } from 'react-router-dom'
import Avatar from '../../../components/Avatar'

interface IContactBox {
  pick: boolean
}
const ContactBox = styled.div<IContactBox>`
  display: flex;
  flex-direction: row;
  margin: 3px 0;
  border-radius: 0.2rem;
  padding: 0.2rem;
  background-color: ${(props) => (props.pick)? `${Color.lblue}`: ''};
  color: ${Color.lgrey};
  &:hover{
    background-color: ${Color.lblue};
    cursor: pointer;
  }
  .fullName {
    margin: auto 5px;
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
      <Avatar 
        avatarName={props.avatar}
        size={2.2}
      />
      <span className='fullName'> {props.name} </span>
      
    </ContactBox>
  )
}

export default Contact