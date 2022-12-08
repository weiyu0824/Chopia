import React, { useEffect } from 'react'
import internal from 'stream';
import styled from 'styled-components'
import { createRoot } from 'react-dom/client';
// import { Container, Button, Alert } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import { useSummaryStore } from '../../store/SummaryStore'
import Button from 'react-bootstrap/Button';

const Summary = styled.button`
  background-color: #fff;
  border: 0 solid #e2e8f0;
  border-radius: 1.5rem;
  box-sizing: border-box;
  color: #0d172a;
  cursor: pointer;
  display: inline-block;
  font-family: "Basier circle",-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1;
  padding: 1rem 1.6rem;
  margin: 0.5rem 0.5rem 1.5rem 0;
  text-align: center;
  text-decoration: none #0d172a solid;
  text-decoration-thickness: auto;
  transition: all .1s cubic-bezier(.4, 0, .2, 1);
  box-shadow: 0px 1px 2px rgba(166, 175, 195, 0.25);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  &:hover{
    background-color: #1e293b;
    color: #fff;
  }
`


export interface Props {
    id: string;
    topic: string;
    context: string;
};


const MyTopic = (props: Props) => {
    const enterSum = useSummaryStore((state) => state.enterSum)

    const handleClickSummaryButton: React.MouseEventHandler = (e) => {
        console.log(props.id)
        enterSum(props.id, props.topic, props.context)
    }

    
    return (
        <Summary
            onClick={handleClickSummaryButton}>
            {props.topic}
        </Summary>
    )    
      
}
export default MyTopic