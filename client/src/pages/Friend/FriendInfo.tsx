import React from 'react'
import styled from 'styled-components'
import { FaSignOutAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { AiOutlineRobot } from 'react-icons/ai'
import { GoMail } from 'react-icons/go'
import imageToAdd from '../../asset/fox.png'


const Panal = styled.div`
  flex-direction: column;
  display: flex;
  height: 25rem;
  width: 20rem;
  border-radius: 0.8rem;
  padding: 2rem;
  background-color: lightblue;
  cursor: default;

  .avatarBoxx{
    /* height: 6rem;
    width: 100%; */
    .avatarr {
      height: 10rem;
      width: auto;
    }
  }

  .fullName {
    margin: 2rem auto;
    font-size: 1.8rem;
  }

  .newFriendButton {
    margin: 0.3rem;
    border: none;
    border-radius: 0.2rem;
    width: 6rem;
    height: 2.5rem;
    outline: none;
    &:hover {
      background-color: lightyellow;
    }
  }
`

interface IFriendInfo {
}

const FriendInfo: React.FC<IFriendInfo> = (props) => {
  return (
    <Panal>
      <div className='avatarBoxx'>
        <img className='avatarr' src={imageToAdd} alt="Image" />
      </div>
      <span className='fullName'>Anderson</span>
      <div>
        <button className='newFriendButton'>Cancel</button>
        <button className='newFriendButton'>Add</button>
      </div>

    </Panal>
  )
}

export default FriendInfo