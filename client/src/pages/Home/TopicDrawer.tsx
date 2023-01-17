import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'
import { MdSummarize } from 'react-icons/md'
import { MdOutlineAutorenew } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { Summary } from '../../interfaces/Summary'
import { getSummary } from '../../api/ml'
import TopicButtonList from './Topic/TopicButtonList'
import TopicCard from './Topic/TopicCard'
import { Color } from '../../utils/color'
import { Spin } from 'antd';
import Icon from '../../components/Icon'

interface IBox {
  shrink: boolean
  isLoading: boolean
  showWarning: boolean
}

const Box = styled.div<IBox>`
  padding: 5px;
  width: ${props => (props.shrink) ? "50px" : "400px"};
  height: 100vh;
  background-color: ${Color.fagrey};
  transition-duration: 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.isLoading && !props.shrink) ? 'center' : ''};
  align-items: ${props => (props.isLoading && !props.shrink) ? 'center' : 'center'};
  .ant-spin-dot-item {
    background-color: ${Color.blue};
  }
  .loadingIcon {
    display: ${props => (props.isLoading && !props.shrink) ? '' : 'none'};
  }
  .topicDrawerBtns{
    align-self: stretch;
    flex-direction: row;
    justify-content: space-between;
    display: flex;
  }
  #topicGenerationWarning{
    display: ${props => (props.showWarning && !props.shrink) ? '' : 'none'};
    margin: auto;
  }
`

interface ITopicDrawer {
  friendId: string
}
const TopicDrawer: React.FC<ITopicDrawer> = (props) => {
  const summaryColors = [Color.yellow, Color.regrey]
  const [shrink, setShrink] = useState(true)
  const [colorId, setColorId] = useState(0)
  const [summaryId, setSumaryId] = useState(-1)
  const [summarys, setSummarys] = useState<Summary[]>([])
  const [showBtnList, setShowBtnList] = useState(false)
  const [showSummaryCard, setShowSummaryCard] = useState(false)
  const [warning, setWarning] = useState('')
  const [hasFetched, setHasFetched] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [cookies] = useCookies(['access_token', 'refresh_token'])

  useEffect(() => {
    handleRefresh()
    // console.log('use effect clear topic drawer')
  }, [props.friendId])

  const clearTopicDrawer = () => {
    setSumaryId(-1)
    setSummarys([])
    setShowBtnList(false)
    setShowSummaryCard(false)
    setWarning('')
  }

  const handleRefresh = async () => {
    clearTopicDrawer()
    setIsLoading(true)
    try {
      const res = await getSummary(props.friendId, cookies.access_token)
      if (res.data.success === true) {
        setSummarys(res.data.prediction)
        setShowBtnList(true)
      }else {
        setWarning(res.data.message)
        console.log(warning)
      }
    } catch (err) {
      setWarning('Internal Server Error')
    }
    
    setHasFetched(true)
    setIsLoading(false)
  }

  const handleShrinkAndExpand = () => {
    setShrink(!shrink)
    if (hasFetched === false) {
      handleRefresh()
    }
  }

  const changeSummaryCard = (index: number) => {
    setSumaryId(index)
    const nextColorId = (colorId + 1) % summaryColors.length
    setColorId(nextColorId)
    setShowSummaryCard(true)
  }

  const TopicButtonListDisplay = (!shrink && showBtnList && !isLoading) ? 
    <TopicButtonList 
      summarys={summarys} 
      changeSummary={changeSummaryCard} 
    /> :
    <div></div>

  const TopicCardDisplay = (!shrink && showSummaryCard && !isLoading) ?
    <TopicCard 
      summary={summarys[summaryId]} 
      summaryColor={summaryColors[colorId]} 
    /> :
    <div></div>
  
  
  let controlBtns = <></>
  if (shrink) {
    controlBtns = (
      <Icon 
        icon={<MdSummarize />}
        size={1.2}
        shape='square'
        hoverColor={Color.sogrey}
        onClick={handleShrinkAndExpand}
      />
    ) 
  }else if (!shrink && !isLoading){
    controlBtns = (
      <div className='topicDrawerBtns'>
        <Icon 
          icon={<MdOutlineAutorenew />}
          size={1.2}
          shape='square'
          hoverColor={Color.sogrey}
          onClick={handleRefresh}
        />
        <Icon 
          icon={<RxCross2 />}
          size={1.2}
          shape='square'
          hoverColor={Color.sogrey}
          onClick={handleShrinkAndExpand}
        />
      </div>
    )
  }
  return (
    <Box shrink={shrink} isLoading={isLoading} showWarning={warning!==''}>
      {controlBtns}
      <Spin className='loadingIcon'/>
      <span id='topicGenerationWarning'>{warning}</span>
      {TopicButtonListDisplay}
      {TopicCardDisplay}
    </Box>
  )
}

export default TopicDrawer
