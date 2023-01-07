import React, { useState } from 'react'
import styled from 'styled-components'
import { Color } from '../../utils/color'
import { MdOutlineEmojiPeople } from 'react-icons/md'
import FriendInfo from '../Friend/FriendInfo'
import { GiThreeFriends } from 'react-icons/gi'
import Icon from '../../components/Icon'
import { Spin } from 'antd'
import { searchUser } from '../../api/user'
import { useCookies } from 'react-cookie'
import ActionButton from '../../components/ActionButton'
import { setTimeout } from 'timers/promises'

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

  #findFriendTitle{
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

interface ISearchBar {
}
const SearchBar = styled.div<ISearchBar>`
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
  &:focus-within {
    border-color: ${Color.ddgrey}
  }
`
type SearchState = 'empty' | 'withResult' | 'withoutResult' | 'loading'
const FriendPanal: React.FC = () => {
  const [searchStr, setSearchStr] = useState('')
  const [searchState, setSearchState] = useState<SearchState>('empty')
  const [cookies] = useCookies(['access_token', 'refresh_token'])  
  interface SearchInfo {
    userId: string,
    avatar: string,
    name: string,
  }
  const [searchInfo, setSearchInfo] = useState<SearchInfo>({userId: '', avatar:'', name:''})
  
  const onChangeSearchStr:  React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchStr(e.target.value)
  }

  const searchForFriend = async () => {
    setSearchState('loading')
    const res = await searchUser(searchStr, cookies.access_token)
    if (res.data.success) {
      setSearchState('withResult')
      setSearchInfo({
        userId: res.data.userId,
        avatar: res.data.avatar,
        name: res.data.name
      })
    } else {
      setSearchState('withoutResult')
    }
  }

  const sendFriendRequest = async () => {
    // set
    // await setTimeout(10)
  }

  let result = <></>
  if (searchState === 'empty'){
    result = (<Icon
              icon={<GiThreeFriends />}
              size={5}
              color='red'
            />)
  } else if (searchState === 'withResult') {
    result = <FriendInfo 
                friendId={searchInfo.userId}
                name={searchInfo.name}
                avatar={searchInfo.avatar}
                onClickAdd={sendFriendRequest}
                onClickCancel={() => {
                  setSearchStr('')
                  setSearchState('empty')
                }}
              />
  } else if (searchState === 'withoutResult') {
    result = <span>Sorry, we can not find any user with this username or email ...</span> 
  } else if (searchState === 'loading') {
    result = <Spin />
  }

  return (
    <Panal width={40} height={45}>
      <div id='findFriendTitle'>
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
        <input 
          value={searchStr}
          className='searchInput' 
          placeholder='Email or Username'
          onChange={onChangeSearchStr}>
        </input>
        <ActionButton
          word='Search for friend'
          padding='0.5rem 1rem'
          backgroundColor='lightgrey'
          hoverColor='lightblue'
          onClick={searchForFriend}
          allowToAct={searchStr !== ''} />
      </SearchBar>
      

      <div id='searchResult'>
        {result}
      </div>
    </Panal>
  ) 
}

export default FriendPanal