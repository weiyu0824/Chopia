import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Color } from '../../utils/color'
import { RiErrorWarningFill } from 'react-icons/ri'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { IconContext } from 'react-icons'

interface IStyledInputBox {
  showLabel: boolean
  showVisionBtn: boolean
  warn: boolean
}

const StyledInputBox = styled.div<IStyledInputBox>`
  margin: 8px 0px 5px 0px;
  padding: 8px;
  border-width: 1px;
  border-radius: 5px;
  border-style: solid;
  border-color: ${(props) => (props.warn)? 'red' : 'green'};

  background-color: ${Color.white};
  display: flex;
  flex-direction: row;
  position: relative;

  
  .inputLabel {
    display: ${props => props.showLabel? 'block': 'none'};;
    position: absolute;
    font-size: 0.7rem;
    top: -0.6rem;
    left: 0.6rem;
    padding: 0rem 0.2rem;
    background-color: ${Color.white};
  }
  .inputArea {
    width: 100%;
    border: none;
    outline: none;
    font-size: 0.9rem;
    background-color: ${Color.white};

    /* &:focus + label {
      display: 'block' !important;
    } */
  }
  .visionBtn {
    display: ${props => props.showVisionBtn? '' : 'none'};
    border: none;
    outline: none;
    background-color: ${Color.white};
  }

  
`

interface Props {
  isHidden: boolean
}
const InvalidBlock = styled.span<Props>`
  font-size: 0.8rem;
  color: ${Color.lred};
  text-align: left;
  display: ${props => props.isHidden? 'none': 'block'};
`

interface IDataInputBox {
  data: string
  dataName: string
  showWarning: boolean
  warning: string
  isPassword: boolean
  handleFocus: () => void
  handleChange: (newData: string) => void
}

const DataInputBox: React.FC<IDataInputBox> = (props) => {
  const [visibility, setVisibility] = useState(false)

  const handleOnClick = () => {
    props.handleFocus()
  }

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    props.handleChange(e.target.value)
  }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const visionIcon = (visibility)? <AiOutlineEyeInvisible/>: <AiOutlineEye/>
  const inputType = (props.isPassword && !visibility)? 'password': 'text'
  return (
    <>
      <StyledInputBox 
        showLabel={props.data !== ''}
        showVisionBtn={props.isPassword && props.data !== ''}
        warn={props.showWarning && props.warning !== ''}
      >
        
        <input className='inputArea'
          value={props.data} 
          onClick={handleOnClick} 
          onChange={handleOnChange} 
          placeholder={props.dataName}
          type={inputType}
        />
        <label className='inputLabel'> {props.dataName} </label>
        <button 
          className='visionBtn' 
          type='button'
          onClick={toggleVisibility}>
          <IconContext.Provider value={{size: "1.6rem"}}>
            {visionIcon}
          </IconContext.Provider>
        </button>
        
      </StyledInputBox>
      <InvalidBlock 
        isHidden={!props.showWarning || props.warning === ''}>
        <RiErrorWarningFill /> {props.warning}
      </InvalidBlock>
    </>
    
  )
}

export default DataInputBox