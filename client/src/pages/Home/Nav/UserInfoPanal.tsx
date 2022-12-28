import React from 'react'
import styled from 'styled-components'
import { FaSignOutAlt } from 'react-icons/fa'
import { MdEdit } from 'react-icons/md'
import { AiOutlineRobot } from 'react-icons/ai'
import { GoMail } from 'react-icons/go'
import imageToAdd from '../../../asset/gorilla.png'

interface IPanal {
  showPanal: boolean
}
const Panal = styled.div<IPanal>`
  position: absolute;
  top: -19rem;
  flex-direction: column;
  display: ${(props) => (props.showPanal)? 'flex': 'none'};
  height: 18rem;
  width: 17rem;
  border-radius: 0.8rem;
  padding: 1rem;
  background-color: orange;
  cursor: default;
  
  .editButton {
    position: absolute;
    top: 0.5rem;
    left: 14.5rem;
    border-radius: 19rem;
    padding: 0rem 0.3rem;
    background-color: grey;
    cursor: pointer;
    font-size: 1.2rem;
    color: white;

    &:hover{
      background-color: lightblue;
    }
  }

  .avatarBox{
    height: 6rem;
    width: 100%;
    .avatar {
      height: 6rem;
      width: 6rem;
    }
  }

  .fullName {
    font-size: 1.8rem;
  }
`
const ControlPart = styled.div`
  flex-direction: column;
  display: flex;
  border-radius: 0.5rem;
  height: 8rem;
  padding: 0 0.8rem;
  background-color: darkgray;

  .personalInfo {
    border-bottom: solid;
    padding: 0.6rem 0.2rem;
    
    text-align: left;
    color: black;
  }

  .signoutButton{
    flex-grow: 2;
    border-radius: 0.2rem;
    margin: 0.6rem 0rem;
    padding: 0 0.3rem;
    cursor: pointer;
    text-align: left;
    color: black;
    &:hover{
      background-color: lightblue;
    }
  }
`

interface IUserInfoPanal {
  showPanal: boolean
}

const UserInfoPanal: React.FC<IUserInfoPanal> = (props) => {
    return (
      <Panal showPanal={props.showPanal}>
        <div className='editButton'>
          <MdEdit />
        </div>
        
        <div className='avatarBox'>
          <img className='avatar' src={imageToAdd} alt="Image"/>
        </div>
        <span className='fullName'>Anderson</span>

        <ControlPart> 
          <div className='personalInfo'>
            <div> <AiOutlineRobot/> #andersonlin0809</div>
            <div> <GoMail/> jcab1688@gmail.com</div>
          </div>
          
          <div className='signoutButton'> 
            <FaSignOutAlt /> &nbsp;
            <span>Sign out</span>
          </div>
        </ControlPart>
        
      </Panal>
    )
      
}
            
export default UserInfoPanal