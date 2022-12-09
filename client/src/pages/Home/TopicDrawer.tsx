import React, { useState } from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'
import { IconContext } from "react-icons"
import { MdSummarize } from 'react-icons/md'
import { VscRefresh } from 'react-icons/vsc'
import { RxCross1 } from 'react-icons/rx'
import { Summary } from '../../utils/Summary'
import { GetSummaryapi } from '../../api/ml'
import { useAuthStore } from '../../store/AuthStore'
import TopicButtonList from './TopicButtonList'
import TopicCard from './TopicCard'
import {color} from '../../utils/color'
const C = new color()


interface IBox {
  shrink: boolean
  isLoading: boolean
}

const Box = styled.div<IBox>`
  padding: 10px;
  width: ${props => (props.shrink) ? "50px" : "800px"};
  height: 100vh;
  background-color: ${C.white};
  border-style: solid;
  border-color: lightgray;
  transition-property: width;
  transition-duration: 0.3s;
  display: flex;
  flex-direction: column;
  
  .togleBtn {
    /* position: absolute;
    top:5px;
    right:3px;*/
    padding: 5px 8px;
    
    background-color: ${C.white};
    border: none;
    border-radius: 20px;
    /* color: #565151; */
    
    
    &:hover{
      background-color: lightgray;
    };
    
  }
  .expandBtn {
    float: right;
    display: ${props => (props.shrink) ? "inline" : "none"};
  }
  .shrinkBtn {
    float: right;
    display: ${props => (props.shrink) ? "none" : "inline"};
  }
  .refreshBtn {
    float: left;
    display: ${props => (props.shrink) ? "none" : "inline"};
  }
  .loadingIcon {
    display: ${props => (props.isLoading && !props.shrink) ? '' : 'none'}
  }
`

const TopicDrawer: React.FC = () => {
  const summaryColors = [C.blue, C.dblue, C.ddblue]
  const [shrink, setShrink] = useState(true)
  const [summaryId, setSumaryId] = useState(-1)
  const [colorId, setColorId] = useState(0)
  const [summarys, setSummarys] = useState<Summary[]>([])
  const [showBtnList, setShowBtnList] = useState(false)
  const [showSummaryCard, setShowSummaryCard] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const username = useAuthStore((state) => state.username)
  const [cookies, setCookies] = useCookies(['access_token', 'refresh_token'])
  const [hasFetched, setHasFetched] = useState<boolean>(false)
  

  const handleRefresh = async () => {
    const friendUsername = username
    setIsLoading(true)

    const res = await GetSummaryapi(friendUsername, cookies.access_token)
    
    if (res.data !== undefined) {
      setSummarys(res.data)
      setShowBtnList(true)
      setShowSummaryCard(false)
      setSumaryId(-1)
    }
    setIsLoading(false)
  }

  const handleShrinkAndExpand = () => {
    setShrink(!shrink)
    if (hasFetched == false) {
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
  
  
  return (
    <Box shrink={shrink} isLoading={isLoading}>
      <div>
        <button className="togleBtn refreshBtn" onClick={handleRefresh}>
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <VscRefresh />
          </ IconContext.Provider>
        </button>
        <button className="togleBtn expandBtn" onClick={handleShrinkAndExpand}>
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <MdSummarize />
          </ IconContext.Provider>
        </button>
        <button className="togleBtn shrinkBtn" onClick={handleShrinkAndExpand}>
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <RxCross1 />
          </ IconContext.Provider>
        </button>
      </div>
      {/* <div className="topicDisplay">
        <TopicBox/>
      </div> */}
      <span className='loadingIcon'> is loading ...</span>
      {TopicButtonListDisplay}
      {TopicCardDisplay}
    </Box>
  )
}

export default TopicDrawer
