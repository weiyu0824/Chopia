import React from 'react'
import styled from 'styled-components'
import {color} from '../../utils/color'
const C = new color()
const MyContainer = styled.div`
  background-color: ${C.dblue};
  height: 100vh;
  .demo{
    color:${C.white};
  }
`
const Demo: React.FC = () => {
  return (
    <MyContainer>
      <h1 className="demo"> Demo </ h1>
    </MyContainer> 
  )
}

export default Demo