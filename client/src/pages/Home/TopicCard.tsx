import React from 'react'
import styled from 'styled-components'
import { Summary } from '../../utils/Summary'
import OriginalSentences from './OriginalSentences'

interface ISummaryCard {
  summaryColor: string
}

const SummaryCard = styled.div<ISummaryCard>`
  width: auto;
  height: auto;
  flex-grow: 2;
  /* height: 100px; */
  background-color: ${props => props.summaryColor};
  border-radius: 15px;
  padding: 10px;
  margin: 10px 0px;

  .summary-header {
    text-align: left;
  }
  .summary-paragraph {
    text-align: left;
  }
  
`

interface Props {
  summaryColor: string
  summary: Summary
}

const TopicCard: React.FC<Props> = (props: Props) => {
  console.log('topic card')
  console.log(props.summary)
  return(
    <SummaryCard summaryColor={props.summaryColor}>
      <h1 className="summary-header">Summery</h1>
      <p className="summary-paragraph">{props.summary.summary} </p>
      <br />
      <br />
      <br />
      <br />
      <OriginalSentences sentences={props.summary.original}/>
    </SummaryCard>
  )
  
}

export default TopicCard
