import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { Summary } from '../../../interfaces/Summary'
import { Color } from '../../../utils/color'

const ButtonWindow = styled.div`
  flex-direction: row;
  display: flex;
  margin-top: 10px;
  width: 400px;
  height: 60px;
  max-height: 50px;
  padding: 0px 5px;

  overflow-x: scroll;
  ::-webkit-scrollbar {
    height: 0px;
    width: 0px;
  }
`

interface ITopicButton {
  pick: boolean
}
const TopicButton = styled.button<ITopicButton>`
  background-color: ${props => (props.pick) ? Color.sogrey : Color.migrey};
  color: ${Color.white};
  position: relative;
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  margin: 4px 8px 4px 0px;
  white-space: nowrap;
  &:hover{
    top: -2px;
  }
`
interface Props {
  summarys: Summary[]
  changeSummary: (id: number) => void
}

const TopicButtonList: React.FC <Props>= (props: Props) => {
  const [pickedBtnId, setPickedBtnId] = useState(-1)

  const handlePickSummary = (index: number) => {
    setPickedBtnId(index)
    props.changeSummary(index)
  }

  const TopicButtons = props.summarys.map((value, index) => {
    const pick = (pickedBtnId === index) ? true: false;
    const summaryTitle = (value.summary.length > 10) ? `${value.summary.slice(0, 8)} ...` : value.summary
    return <TopicButton pick={pick} key={index} onClick={() => handlePickSummary(index)}>{summaryTitle}</TopicButton>
  })
  
  return (
    <ButtonWindow>
      {TopicButtons}
    </ButtonWindow>
  )
}

export default TopicButtonList
