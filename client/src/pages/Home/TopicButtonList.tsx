import React from 'react'
import styled from 'styled-components'
import {color} from '../../utils/color'
const C = new color()
interface IButtonWindow {
  show: boolean
}
const ButtonWindow = styled.div<IButtonWindow>`
  display: ${props => (props.show) ? 'flex' : 'none'};
  width: 400px;
  height: 60px;
  max-height: 50px;
  /* flex: 1; */
  /* white-space: nowrap; */
  overflow-x: scroll;
  flex-direction: row;
`

const TopicButton = styled.button`
  background-color: ${C.blue};
  color:${C.white};
  position: relative;
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  margin: 4px;
  white-space: nowrap;
  &:hover{
    top: -2px;
  }
`
interface Props {
  show: boolean
}

const TopicButtonList: React.FC <Props>= (props: Props) => {
  return (
    <ButtonWindow show={props.show}>
      <TopicButton>Summary 1</TopicButton>
      <TopicButton>Summary 2</TopicButton>
      <TopicButton>Summarysdfsdfgds3</TopicButton>
      <TopicButton>Summary 4</TopicButton>
      <TopicButton>Summary 5</TopicButton>
      <TopicButton>Summary 6</TopicButton>
    </ButtonWindow>
  )
}

export default TopicButtonList
