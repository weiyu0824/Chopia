import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Color } from '../../utils/color'
import { MdEmail } from 'react-icons/md'
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from '../../components/Icon'
import ActionButton from '../../components/ActionButton'

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${Color.dblue};

`
const Announcement = styled.div`
  left: calc(50vw - (45vw / 2));
  top: calc(50vh - (60vh / 2));
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  display: flex;
  border-radius: 10px;
  width: 45vw;
  height: 60vh;
  padding: 30px;
  background-color: ${Color.white};
`

const GoVerification: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const userId = searchParams.get('id')
    const email = searchParams.get('email')

    if (!userId || !email) {
      navigate('/error')
    }
    
  }, [])
  
  return (
    <Wrapper>
      <Announcement >
        <Icon 
          icon={<MdEmail />}
          size={6}
        />
        <h2>Please verify your email.</h2>
        <div>
         <span>We have send an email to you. Just click the link and complete the sign up</span><br/>
          <strong>{searchParams.get('email')}</strong>
        </div>
        <ActionButton 
          word='Resend Link'
          padding='10px'
          backgroundColor={Color.blue}
          color='white'
        />
      </Announcement>
    </Wrapper>
  )
}

export default GoVerification