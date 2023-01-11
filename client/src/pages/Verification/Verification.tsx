import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Color } from '../../utils/color'
import { IoMdCheckmarkCircle } from 'react-icons/io'
import { MdError } from 'react-icons/md'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verify } from '../../api/auth'
import Icon from '../../components/Icon'

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: ${Color.dblue};
`
interface IAnnouncement {
  success: boolean
}
const Announcement = styled.div<IAnnouncement>`
  left: calc(50vw - (40vw / 2));
  top: calc(50vh - (50vh / 2));
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  display: flex;
  border-radius: 10px;
  width: 40vw;
  height: 50vh;
  padding: 20px;
  background-color: ${Color.white};
  #successMessage {
    color: ${(props) => (props.success)? '': 'red'};
  }
`

const Verification: React.FC = () => {
  const [success, setSuccess] = useState(false)
  const [warning, setWarning] = useState('')
  const [searchParams, setSearchParam] = useSearchParams()

  const navigate = useNavigate()

  const verifyUser = async () => {
    try {
      const userId = searchParams.get('id')
      const token = searchParams.get('token')
      if (!userId || !token) {
        navigate('/error')
      } else {
        const res = await verify(userId, token)
        if (res.data.success) {
          setSuccess(true)
        } else {
          setWarning(res.data.message)
        }
      }
    } catch (err) {
      navigate('/error')
    }

  }
  useEffect (() => {
    verifyUser()
  }, [])

  let icon = (success) ? (
    <Icon
      icon={<IoMdCheckmarkCircle />}
      size={6}
    />
  ) : (
    <Icon
      icon={<MdError />}
      size={6}
      color='red'
    />
  )
  let message = (success) ? (
    <h2 id='successMessage'>Your email has been verifed</h2>
  ) : (
    <h2 id='successMessage'>{warning}</h2>
  )
  return (
    <Wrapper>
      <Announcement success={success}>
        {/* <Avatar 
          avatarName='logo'
          size={3}
        /> */}
        {icon}
        {message} 
      </Announcement>


    </Wrapper>
  )
}

export default Verification