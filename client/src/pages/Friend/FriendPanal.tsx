import React from 'react'
import styled from 'styled-components'
import { Color } from '../../utils/color'
import { MdOutlineEmojiPeople } from 'react-icons/md'
import FriendInfo from '../Friend/FriendInfo'

const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  height: 100vh;
  width: 100%;
  padding: 2rem 5rem;
  border-style: none;
  background-color: ${Color.white};
  .windowTitle{
    text-align: left;
    font-size: 26pt; //h2
  }
  .info {
    margin: 0 0 1rem 0;
    text-align: left;
  }
  .avatarBox {
    flex-shrink:0;
    margin: auto 1rem;
    width: 2rem;
    height: 2rem;
    .avatar {
      width: 100%;
      height: 100%;
    }
  }
  .friendInfo {
    margin: auto;
  }
`
const SearchBar = styled.div`
  flex-direction: row;
  display: flex;
  border: 0.1rem solid darkgray;
  border-radius: 0.4rem;
  width: 100%;
  padding: 1rem;
  background-color: darkgray;
  color: black;
  .searchInput {
    flex-grow: 1;
    border: none;
    background-color: inherit;
    outline: none;
    ::placeholder{
      color: black;
    }
  }
  .searchButton {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.2rem;
    outline: none;
    color: black;
    &:hover {
      background-color: ${Color.lightblue};
    }
  }
  &:focus-within {
    border-color: ${Color.ddgrey}
  }
`

const FriendPanal = () => {
  return (
    <Wrapper>
      <div className='windowTitle'>
        <span>Find new friend</span>
        <MdOutlineEmojiPeople />
      </div>
      
      <div className='info'>
        <span>You can find new friend with their username or email address!</span>
      </div>
      <SearchBar className='info'>
        <input className='searchInput' placeholder='Email or Username'></input>
        <button className='searchButton'>Search for friend</button>
      </SearchBar>
      
      {/* <span>Sorry we can not find any user with this username</span> */}
      <div className='friendInfo'>
        <FriendInfo />
      </div>
      

    </Wrapper>
  ) 
}

export default FriendPanal