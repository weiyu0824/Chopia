import React from 'react'
import styled from 'styled-components'
import { Color } from '../../utils/color'
import { MdOutlineEmojiPeople } from 'react-icons/md'
import FriendInfo from '../Friend/FriendInfo'
import Icon from '../../components/Icon'


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
  border-style: solid black;
  border-radius: 0.5rem;
  background-color: ${Color.white};
  width: ${(props) => `${props.width}rem`};
  height: ${(props) => `${props.height}rem`};
  padding: 2rem 2rem;
  color: black;

  #finedFriendTitle{
    text-align: left;
    font-size: 26pt; //h2
  }
  #friendPanalInfo {
    margin: 0 0 1rem 0;
    text-align: left;
  }
  #searchResult {
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

const FriendPanal: React.FC = () => {
  return (
    <Panal width={50} height={45}>
      <div id='finedFriendTitle'>
        <span>Find new friend</span>
        <Icon
            icon={<MdOutlineEmojiPeople />}
            size={2}
          />
      </div>
      
      <div id='friendPanalInfo'>
        <span>You can find new friend with their username or email address!</span>
      </div>
      <SearchBar>
        <input className='searchInput' placeholder='Email or Username'></input>
        <button className='searchButton'>Search for friend</button>
      </SearchBar>
      
      
      
      <div id='searchResult'>
        <span>Sorry, we can not find any user with this username or email ...</span>
        {/* <FriendInfo /> */}
      </div>

    </Panal>
  ) 
}

export default FriendPanal