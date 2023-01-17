import styled from 'styled-components'
import { Color } from '../../../utils/color'
import Avatar from '../../../components/Avatar'

interface IWrapper {
  noAvatar: boolean
}

const Wrapper = styled.div<IWrapper>`
  margin-top: ${props => props.noAvatar ? '' : '10px'};
  border-style: none;
  display: flex;
  flex-direction: row;
  border-radius: 1px;

  &:hover{
    background-color: ${Color.fagrey};
  }
  .avatarSquare{
    flex-shrink: 0;
    width: 70px;
  }
  .messageRectangle{
    flex-direction: column;
    display: flex;
    text-align: left;
    .senderName{
      font-weight: 500;
      font-size: 1.1rem;
      padding-right: 10px;
    }
    .time{
      font-size: 0.8rem;
      color: grey;
    }
    .messageText{
      font-size: 1rem;
      white-space: pre-line;
    }
  }
`

export interface Props {
  messageText: string,
  senderName: string,
  timestamp: string,
  avatar: string,
  noAvatar: boolean
}

const MessageEditor = (props: Props) => {
  if (props.noAvatar === true) {
    return (
      <Wrapper noAvatar={props.noAvatar}>
        <div className='avatarSquare'></div>
        <div className='messageRectangle'>
          <span className="messageText">{props.messageText}</span>
        </div>
      </Wrapper>
    )
  } else {
    return (
      <Wrapper noAvatar={props.noAvatar}>
        <div className='avatarSquare'>
          <Avatar avatarName={props.avatar} size={2.5}/>
        </div>
        <div className='messageRectangle'>
          <div>
            <span className="senderName">{props.senderName}</span>
            <span className="time">{props.timestamp}</span>
          </div>
          <span className="messageText">{props.messageText}</span>
          </div>
      </Wrapper>
    )
  }
}
export default MessageEditor