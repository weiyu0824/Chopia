import React from 'react'
import styled, { css } from 'styled-components'
import { GrRefresh } from 'react-icons/gr'
import { VscRefresh } from 'react-icons/vsc'
import { IconContext } from "react-icons"
import { useCookies } from 'react-cookie'
import { keyframes } from 'styled-components'
import ReactDOM from "react-dom";
import MyTopic from './MyTopic'
import { useSummaryStore } from '../../store/SummaryStore'
import { useAuthStore } from '../../store/AuthStore'
import { CSSTransition } from 'react-transition-group'
//import { Button } from 'antd'
import { GetSummaryapi } from '../../api/ml'
import { useState } from 'react'
import { Summary } from '../../utils/Summary'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Box = styled.div`
    width: auto;
    height: 100vh;
    background-color: white;
`
const TopicButtons = styled.div`
    margin: auto auto;
    top: 50%;
    width: 75%;
    margin-top: 50px;
`

const popin = keyframes`
    from { 
        opacity: 0; 
        transform: scale(0.9);
    }
    to { 
        opacity: 1; 
        transform: translateX(0);
        transition: opacity 300ms, transform 300ms;
    }
`

const popout = keyframes`
    from { 
        opacity: 1; 
    }
    to { 
        opacity: 0; 
        transform: scale(0.9);
        transition: opacity 300ms, transform 300ms;
    }
`

const FullSummary = styled.div`
  width: 75%;
  margin: auto auto;
  margin-top: 50px;
  animation: ${popin} 300ms;
`
const RefreshIcon = styled.button`
  background-color: white;
  border: none;
  border-radius: 5px;
  color: grey;
  &:hover{
    background-color: lightgray;
  };
`
const CloseIcon = styled.button`
  background-color: #1e293b;
  border: 0 solid #e2e8f0;
  border-radius: 1.5rem;
  box-sizing: border-box;
  color: #0d172a;
  cursor: pointer;
  display: inline-block;
  font-family: "Basier circle",-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  line-height: 1;
  padding: 1rem 1.6rem;
  text-align: center;
  text-decoration: none #0d172a solid;
  text-decoration-thickness: auto;
  transition: all .1s cubic-bezier(.4, 0, .2, 1);
  box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.25);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &:hover{
    background-color: #fff;
    color: #1e293b;
  }
`

const TopicBox = () => {
  const clickedSum = useSummaryStore((state) => state.clickedSum)
  const topicID = useSummaryStore((state) => state.topicID)
  const topicTitle = useSummaryStore((state) => state.topicTitle)
  const topicContext = useSummaryStore((state) => state.topicContext)
  const startSum = useSummaryStore((state) => state.startSum)
  const endSum = useSummaryStore((state) => state.endSum)
  const enterSum = useSummaryStore((state) => state.enterSum)
  const leaveSum = useSummaryStore((state) => state.leaveSum)
  const username = useAuthStore((state) => state.username)
  const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])
  const [summary, setSummary] = useState<Summary[]>([])
  

  const handleLoadSummary = async () => {
    const friendUsername = username
    const res = await GetSummaryapi(friendUsername, cookies.access_token)
    if (res.data !== undefined) {
      console.log('test', res.data)
      setSummary(res.data)
    }
  }

  const handleClickSummaryButton: React.MouseEventHandler = (e) => {
    endSum()
  }

  const topics = summary.map(
    (box, id) => <MyTopic key={id} topic={'test'} context={box.summary} id={'test'} />
  )

  if (clickedSum) {
    return (
      <Box>
        {/* <FullSummary 
                    onClick={handleClickSummaryButton}>
                {topicContext} <br/>
                </FullSummary> */}
        <FullSummary onClick={handleClickSummaryButton}>
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px180" />  */}
            <Card.Body>
              <Card.Title> {topicTitle}
              </Card.Title>
              <Card.Text>
                {topicContext}
              </Card.Text>
              <CloseIcon onClick={handleClickSummaryButton}>Close</CloseIcon>
            </Card.Body>
          </Card>
        </FullSummary>
      </Box>
    )
  }
  else {
    return (
      <Box>
        <div>
          <Button onClick={handleLoadSummary}> Get Summary </Button>
        </div>
        <TopicButtons>
          {topics}
        </TopicButtons>
        
      </Box>
    )
  }
}

export default TopicBox
