import React from 'react'
import { Color } from '../../utils/color'
import styled from 'styled-components'
import Icon from '../../components/Icon'
import { AiFillMessage }  from 'react-icons/ai'

const Wrapper = styled.div`
  flex-grow: 1;
  flex-direction: column;
  display: flex;
  margin: auto;
  color: ${Color.ddgrey};
`

const DefaultArea: React.FC = () => {
  return (
    <Wrapper>
      <div>
        <Icon 
          icon={<AiFillMessage />}
          size={5}
        />
      </div>
      <span>Start chatting with your friend ...</span>
    </Wrapper>
  )
}

export default DefaultArea;