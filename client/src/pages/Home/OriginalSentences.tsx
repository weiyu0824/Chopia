import React from 'react'
import styled from 'styled-components'
import { IconContext } from "react-icons"
import { RxAvatar } from 'react-icons/rx'
import {color} from '../../utils/color'
const C = new color()
interface Props {

}
const SentencePanal = styled.div`
    height: 200px;
    overflow-y: scroll;
`
const Sentence = styled.div`
    background-color: ${C.blue};
    color: ${C.white};
    margin: 5px 0px;
    text-align: left;
`

const OriginalSentences: React.FC<Props> = (props: Props) => {
    return (
        <SentencePanal>
            <Sentence> 
                <IconContext.Provider value={{}}>
                    <RxAvatar />
                </ IconContext.Provider>
                {/* <RxAvatar/> */}
                 How much is it ?
            </Sentence>
            <Sentence>Hi there , I want to reserve a hotel room</Sentence>
            <Sentence>No problem at all . Could I have your full name , please ?</Sentence>
            <Sentence>Hi , Mr . Sandals . I'm Michelle , at your service . When do you need the room ?</Sentence>
            <Sentence>Certainly , sir .</Sentence>
            <Sentence>Certainly , sir .</Sentence>
            <Sentence>Certainly , sir .</Sentence>
            <Sentence>Certainly , sir .</Sentence>
        </SentencePanal>
    )
}

export default OriginalSentences
