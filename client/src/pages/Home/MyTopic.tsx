import React, { useEffect } from 'react'
import internal from 'stream';
import styled from 'styled-components'
import { createRoot } from 'react-dom/client';
// import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { useSummaryStore } from '../../store/SummaryStore'


const Summary = styled.button`
    width: 100px;
    height: 50px;
    background-color: #B8F1B0;
    border-style: solid;
    border-color: lightgray;
    padding: 10px;
    border-radius: 20px;
    margin: 10px 10px 10px 10px;
    &:hover{
        border-style: solid;
        border-color: black;
    }
`

export interface Props {
    topic:string,
    context:string,
    id:string
};


const MyTopic = (props: Props) => {
    const enterSum = useSummaryStore((state) => state.enterSum)

    const handleClickSummaryButton: React.MouseEventHandler = (e) => {
        enterSum(props.id, props.topic, props.context)
    }

    
    return (
        <Summary
            onClick={handleClickSummaryButton}>
            {props.context.slice(0,8)}
        </Summary>
    )    
      
}
export default MyTopic