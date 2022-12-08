import React from 'react'
import styled, { css } from 'styled-components'
import { GrRefresh } from 'react-icons/gr'
import { VscRefresh } from 'react-icons/vsc'
import { IconContext } from "react-icons"

import { keyframes } from 'styled-components'
import ReactDOM from "react-dom";
import MyTopic from './MyTopic'
import { useSummaryStore } from '../../store/SummaryStore'
import { CSSTransition } from 'react-transition-group';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Box = styled.div`
    width: 100%;
    height: 700px;
    background-color: white;
    border-style: solid;
    border-color: lightgray;

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


const data = {
    content: {
        body: [
            {
                id: "1",
                topic: "topic1",
                context: "summary1 bllllblaaaaaaaaaaaaaaa bllaaaaaaaaaaaaa"
            },
            {
                id: "2",
                topic: "topic2",
                context: "summary2"
            },
            {
                id: "3",
                topic: "topic3",
                context: "summary3"
            },
            {
                id: "4",
                topic: "topic4",
                context: "summary4"
            },
            {
                id: "5",
                topic: "topic5",
                context: "summary5"
            },
            {
                id: "6",
                topic: "topic6",
                context: "summary5"
            }
        ]
    }
};


const TopicBox = () => {    
    const clickedSum = useSummaryStore((state) => state.clickedSum)
    const topicID = useSummaryStore((state) => state.topicID)
    const topicTitle = useSummaryStore((state) => state.topicTitle)
    const topicContext = useSummaryStore((state) => state.topicContext)
    const startSum = useSummaryStore((state) => state.startSum)
    const endSum = useSummaryStore((state) => state.endSum)
    const enterSum = useSummaryStore((state) => state.enterSum)
    const leaveSum = useSummaryStore((state) => state.leaveSum)
    const [tname, setTname] =React.useState("")

    const handleClickSummaryButton: React.MouseEventHandler = (e) => {
        endSum()
    }

    const topics = data.content.body.map( 
        (box, id) => <MyTopic key={id} topic={box.topic} context={box.context} id={box.id}/>
    )

      
    if(clickedSum){
        return(
            <Box>
                <FullSummary>
                <Card>
                    {/* <Card.Img variant="top" src="holder.js/100px180" />  */}
                    <Card.Body>
                        <Card.Title>Card Title {topicTitle} {tname}
                        </Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                        {topicContext}
                        </Card.Text>
                        <CloseIcon  onClick={handleClickSummaryButton}>Close</CloseIcon>
                    </Card.Body>
                </Card>
                </FullSummary>
            </Box>
        )
    }
    else{
        return(
            <Box>
            <div>
            <input></input>
            <RefreshIcon>
                <IconContext.Provider value={{ size: "1.2rem" }}>
                <VscRefresh />
                </ IconContext.Provider>
                {/* <GrRefresh id='try'/> */}
            </RefreshIcon>
            </div>
            <TopicButtons>
            {topics}
            </TopicButtons>
            </Box>
        )
    }
}

export default TopicBox
