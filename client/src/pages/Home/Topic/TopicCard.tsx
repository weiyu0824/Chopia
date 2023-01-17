import React from 'react'
import styled from 'styled-components'
import { Summary } from '../../../interfaces/Summary'
import OriginalSentences from './OriginalSentences'
import { Color } from '../../../utils/color'

interface ISummaryCard {
  summaryColor: string
}

const SummaryCard = styled.div<ISummaryCard>`
  align-self: stretch;
  width: auto;
  height: auto;
  flex-grow: 2;
  /* height: 100px; */
  background-color: ${props => props.summaryColor};
  border-radius: 8px;
  padding: 10px;
  margin: 10px 0px;
  color: ${Color.sogrey};
  .summary-header {
    text-align: left;
    color: ${Color.sogrey};
  }
  .summary-paragraph {
    text-align: left;
    color: ${Color.sogrey};
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
      <h1 className="summary-header">Summary</h1>
      <p className="summary-paragraph">{props.summary.summary} </p>
      <br />
      <br />
      <br />
      <br />
      <OriginalSentences sentencesColor={props.summaryColor} sentences={props.summary.original}/>
    </SummaryCard>
  )
  
}

export default TopicCard
