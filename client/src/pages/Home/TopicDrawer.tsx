import React, { useState } from 'react'
import styled from 'styled-components'
import { IconContext } from "react-icons"
import { MdSummarize } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import TopicButtonList from './TopicButtonList'
import TopicCard from './TopicCard'
import TopicBox from './TopicBox'
import {color} from '../../utils/color'
const C = new color()

interface IBox {
  shrink: boolean
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
    color: #565151;
    float: right;
    
    &:hover{
      background-color: lightgray;
    };
    
  }
  .expandBtn {
    display: ${props => (props.shrink) ? "inline" : "none"};
  }
  .closeBtn {
    display: ${props => (props.shrink) ? "none" : "inline"};
  }
`

const TopicDrawer: React.FC = () => {
  const [shrink, setShrink] = useState(true)

  const handleShrinkAndExpand = () => {
    console.log(shrink)
    setShrink(!shrink)
  }

  return (
    <Box shrink={shrink}>
      <div>
        <button className="togleBtn expandBtn" onClick={handleShrinkAndExpand}>
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <MdSummarize />
          </ IconContext.Provider>
        
        </button>
        <button className="togleBtn closeBtn" onClick={handleShrinkAndExpand}>
          <IconContext.Provider value={{ size: "1.2rem" }}>
            <RxCross1 />
          </ IconContext.Provider>
        </button>
      </div>
      {/* <div className="topicDisplay">
        <TopicBox/>
      </div> */}
      <TopicButtonList show={!shrink}/>
      <TopicCard show={!shrink} />
    </Box>
  )
}

export default TopicDrawer
