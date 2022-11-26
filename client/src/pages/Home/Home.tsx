import React, { useState } from 'react'
import { Row, Col, Container } from 'reactstrap'
import ChatFeed from './ChatFeed'
import TopicBox from './TopicBox'
// const MessageBox: React.FC = (props: {message: string}) => {
//     return <div>props.message</div>
// }
const Home: React.FC = () => {
    const [inputMessage, setInputMessage] = useState("")
    const [messages, setMessages] = useState([""])

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInputMessage(e.target.value)
        console.log(inputMessage)
    }
    const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(inputMessage)
        const updatedMessages = messages.concat(inputMessage)
        setMessages(updatedMessages)
        setInputMessage("")

    }

    let chatHistory: JSX.Element[] = []
    messages.forEach((message, index) => {
        chatHistory.push(<div key={index}>{message}</div>)
    })
    return (
        <div>
            {/* {chatHistory}
            <textarea value={inputMessage} onChange={handleTextChange}> </textarea>
            <button onClick={handleSend}> send </button> */}
            <Container>
                <Row noGutters>
                    <Col>
                        <ChatFeed />
                    </Col>
                    <Col>
                        <TopicBox />
                    </Col>
                </Row>
            </Container>
            
            
            
        </div>
    )
}

export default Home