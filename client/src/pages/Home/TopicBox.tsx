import React from "react";
import styled, { css } from "styled-components";
import { keyframes } from 'styled-components'
import ReactDOM from "react-dom";
import MyTopic from './MyTopic'
import { useSummaryStore } from '../../store/SummaryStore'
import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import './Transition.css'


const Box = styled.div`
    width: auto;
    height: 500px;
    background-color: white;
    border-style: solid;
    border-color: lightgray;

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

const FullSummary = styled.button`
  background: grey;
  padding: 25px;
  margin: 0 auto; 
  width: 500px;
  height:500px;
  animation: ${popin} 300ms;
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

    const handleClickSummaryButton: React.MouseEventHandler = (e) => {
        endSum()
    }

    const topics = data.content.body.map( 
        (box, id) => <MyTopic key={id} topic={box.topic} context={box.context} id={box.id}/>
    )
      
    if(clickedSum){
        return(
            <Box>
                <FullSummary 
                    onClick={handleClickSummaryButton}>
                {topicID} <br/>
                {topicTitle} <br/>
                {topicContext} <br/>
                </FullSummary>
            </Box>
        )
    }
    else{
        return(
            <Box>
                {topics}
            </Box>
        )
    }
}

export default TopicBox
