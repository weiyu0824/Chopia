import React from 'react'
import styled from 'styled-components'
import { GrRefresh } from 'react-icons/gr'
import { VscRefresh } from 'react-icons/vsc'
import { IconContext } from "react-icons"
import './style.css'

const Box = styled.div`
    width: auto;
    height: 700px;
    background-color: white;
    border-style: solid;
    border-color: lightgray;
`
const RefreshIcon = styled.button`
  background-color: white;
  border: none;
  border-radius: 5px;
  color: grey;
  &:hover{
    background-color: lightgray;
  };
`

const TopicBox = () => { 
  return (
    <Box>
      <input></input>
      {/*  */}
      <RefreshIcon >
        <IconContext.Provider value={{ size: "1.2rem" }}>
          <VscRefresh />
        </ IconContext.Provider>
        {/* <GrRefresh id='try'/> */}
      </RefreshIcon>
      {/*  */}
      
    </Box>
  ) 
}


export default TopicBox