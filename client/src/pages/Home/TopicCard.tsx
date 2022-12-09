import React from 'react'
import styled from 'styled-components'
import OriginalSentences from './OriginalSentences'
import {color} from '../../utils/color'
const C = new color()
interface ISummaryCard {
  show: boolean
}

const SummaryCard = styled.div<ISummaryCard>`
  display: ${props => (props.show) ? '':'none'};
  width: auto;
  height: auto;
  flex-grow: 2;
  /* height: 100px; */
  background-color: ${C.blue};
  border-radius: 15px;
  padding: 10px;
  margin: 10px 0px;

  .summary-header {
    text-align: left;
    color: ${C.white};
  }
  .summary-paragraph {
    text-align: left;
    color: ${C.white};
  }
  
`

interface Props {
  show: boolean
}

const TopicCard: React.FC<Props> = (props: Props) => {
  return (
    <SummaryCard show={props.show}>
      <h1 className="summary-header">Summery</h1>
      <p className="summary-paragraph">Do you have a big, blank wall you don’t know how to deco
        rate? Check out 12 affordable large wall decor ideas that 
        are amazing solutions for your living room, bedroom and more!
         #''livingroomcurtains'' </p>
      <br />
      <br />
      <br />
      <br />

      <OriginalSentences />
    </SummaryCard>
  )
}

export default TopicCard
