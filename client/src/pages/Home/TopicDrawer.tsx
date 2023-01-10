import React, { useState } from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'
import { IconContext } from "react-icons"
import { MdSummarize } from 'react-icons/md'
import { VscRefresh } from 'react-icons/vsc'
import { RxCross1 } from 'react-icons/rx'
import { Summary } from '../../interfaces/Summary'
import { getSummary } from '../../api/ml'
import TopicButtonList from './Topic/TopicButtonList'
import TopicCard from './Topic/TopicCard'
import { Color } from '../../utils/color'
import { Spin } from 'antd';
import { useUserInfoStore } from '../../store/UserInfoStore'
import Icon from '../../components/Icon'



interface IBox {
  shrink: boolean
  isLoading: boolean
}

const Box = styled.div<IBox>`
  padding: 10px;
  width: ${props => (props.shrink) ? "50px" : "400px"};
  height: 100vh;
  background-color: lightblue;
  transition-duration: 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.isLoading && !props.shrink) ? 'center' : ''};
  align-items: ${props => (props.isLoading && !props.shrink) ? 'center' : ''};
  .ant-spin-dot-item {
    background-color: ${Color.blue};
  }
  .loadingIcon {
    display: ${props => (props.isLoading && !props.shrink) ? '' : 'none'};
  }
  .topicDrawerBtns{
    flex-direction: row;
    display: flex;
    justify-content: space-between
  }
`

interface ITopicDrawer {
  friendId: string
}
const TopicDrawer: React.FC<ITopicDrawer> = (props) => {
  const summaryColors = [Color.dblue, Color.blue]
  const [shrink, setShrink] = useState(true)
  const [summaryId, setSumaryId] = useState(-1)
  const [colorId, setColorId] = useState(0)
  const [summarys, setSummarys] = useState<Summary[]>([])
  const [showBtnList, setShowBtnList] = useState(false)
  const [showSummaryCard, setShowSummaryCard] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const username = useUserInfoStore((state) => state.username)
  const [cookies] = useCookies(['access_token', 'refresh_token'])
  const [hasFetched, setHasFetched] = useState<boolean>(false)
  

  const handleRefresh = async () => {
    // console.log('refresh')
    setIsLoading(true)
    const res = await getSummary(props.friendId, cookies.access_token)
    
    if (res.data !== undefined) {
      setSummarys(res.data)
      setShowBtnList(true)
      setShowSummaryCard(false)
      setSumaryId(-1)
    }else {

    }
    setIsLoading(false)
  }

  const handleShrinkAndExpand = () => {
    setShrink(!shrink)
    if (hasFetched === false) {
      console.log('get ')
      handleRefresh()
      setHasFetched(true)
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
      <div className='topicDrawerBtns'>
        <Icon 
          icon={<MdSummarize />}
          size={1.2}
          backgroundColor='white'
          hoverColor='lightgray'
          onClick={handleShrinkAndExpand}
        />
     </div>
    ) 
  }else if (!shrink && !isLoading){
    controlBtns = (
      <div className='topicDrawerBtns'>
        <Icon 
          icon={<VscRefresh />}
          size={1.2}
          backgroundColor='white'
          hoverColor='lightgray'
          onClick={handleRefresh}
        />
        <Icon 
          icon={<RxCross1 />}
          size={1.2}
          backgroundColor='white'
          hoverColor='lightgray'
          onClick={handleShrinkAndExpand}
        />
      </div>
    )
  }
  return (
    <Box shrink={shrink} isLoading={isLoading}>
      {controlBtns}
      <Spin size= 'large' className='loadingIcon'/>
      {TopicButtonListDisplay}
      {TopicCardDisplay}
    </Box>
  )
}

export default TopicDrawer
