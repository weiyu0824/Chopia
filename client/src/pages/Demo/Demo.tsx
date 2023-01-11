import React from 'react'
import styled from 'styled-components'
import { Color } from '../../utils/color'
 
const MyContainer = styled.div`
  background-color: ${Color.dblue};
  height: 100vh;
  .demo{
    color:${Color.white};
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