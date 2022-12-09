import styled from 'styled-components'
import { Message } from '../../utils/Message'
import {color} from '../../utils/color'
const C = new color()
// const MessageBox = styled.span`
//   background-color: #B8F1B0;
//   padding: 5px 20px;
//   border-radius: 10px 0px 10px 10px;
//   /* float: right; */
// `

interface IMessageBox {
  showOnlyMessage: boolean
}

const MessageWrapper = styled.div<IMessageBox>`
  margin: ${props => props.showOnlyMessage ? "0px 25px" : "0px 25px 0px 25px"};
  /* margin: 3px 25px 3px 25px; */
  /* border-color: lightgray;
  border-style: ${props => props.showOnlyMessage ? 'none none none none' : 'solid none none none'}; */
  border-style: none;
  display: flex;
  flex-direction: row;
  &:hover{
    background-color: ${C.me};
  }
`
const AvatarBox = styled.div<IMessageBox>`
  height: ${props => props.showOnlyMessage ? '0px' : '50px' };
  width: 50px;
  background-color: white;
  border-radius: 100%;
  margin: 5px 10px;
`

const MessageBox = styled.div<IMessageBox>`
  /* padding: 10px; */
  text-align: left;
  .senderName{
    display: ${props => props.showOnlyMessage ? 'none' : 'inline' };
    font-weight: 600;
    font-size: 1.5rem;
    padding-right: 10px;
    margin: 0px;
  };
  .time{
    display: ${props => props.showOnlyMessage ? 'none' : 'inline' };
    font-size: 0.8rem;
    color: grey;
    margin: 0px;
  }
  .messageText{
    font-size: 1rem;
    margin: 0px;
  }
`


export interface Props {
  message: Message,
  showOnlyMessage: boolean
};

const MessageEditor = (props: Props) => {
  if (props.showOnlyMessage === true) {
    return (
      <MessageWrapper showOnlyMessage={props.showOnlyMessage}>
      <AvatarBox showOnlyMessage={props.showOnlyMessage} />
      <MessageBox showOnlyMessage={props.showOnlyMessage}>
        <span className="messageText">{props.message.messageText}</span>
      </MessageBox>
    </MessageWrapper>
    )
  } else {
    return (
      <MessageWrapper showOnlyMessage={props.showOnlyMessage}>
      <AvatarBox showOnlyMessage={props.showOnlyMessage} />
      <MessageBox showOnlyMessage={props.showOnlyMessage}>
        <span className="senderName">{props.message.senderUsername}</span>
        <span className="time">{props.message.time}</span> <br />
        <span className="messageText">{props.message.messageText}</span>
      </MessageBox>
    </MessageWrapper>
    )
  }
}
export default MessageEditor