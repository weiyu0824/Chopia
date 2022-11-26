import styled from 'styled-components'

const MessageBox = styled.span`
  background-color: #B8F1B0;
  padding: 5px 20px;
  border-radius: 10px 0px 10px 10px;
  /* float: right; */
`

const MessageWrapper = styled.div`
  margin: 6px 25px;
  display: flex;
  flex-direction: row-reverse;
`

export interface Props {
  message: string;
};

const MyMessage = (props: Props) => {
  return (
    <MessageWrapper>
      <MessageBox>
        {props.message}
      </MessageBox>
    </MessageWrapper>
  )
}
export default MyMessage