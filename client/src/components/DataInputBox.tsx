import React, { useState } from 'react'
import styled from 'styled-components'
import { Color } from '../utils/color'
import { RiErrorWarningFill } from 'react-icons/ri'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { IconContext } from 'react-icons'

interface IStyledInputBox {
  floatLabel: boolean
  showVisionBtn: boolean
  warn: boolean
  readOnly: boolean
}

const StyledInputBox = styled.div<IStyledInputBox>`
  position: relative;
  flex-direction: row;
  display: flex;
  margin: 8px 0px 5px 0px;
  border: solid 1px;
  border-radius: 5px;
  border-color: ${(props) => (props.warn)? 'red' : 'green'};
  padding: 8px;
  background-color: ${Color.white};
  
  label {
    position: absolute;
    top: ${(props) => (props.floatLabel)? '-0.5rem' : '0.5rem'};
    left: 0.5rem;
    padding: 0rem 0.2rem;
    background-color: ${Color.white};
    font-size: ${(props) => (props.floatLabel)? '0.7rem' : ''};
    pointer-events: ${(props) => (props.floatLabel)? 'none' : ''};
    transition: 0.2s;
  }
  .dataInputArea {
    width: 100%;
    border: none;
    outline: none;
    background-color: ${Color.white};
    cursor: ${(props) => (props.readOnly)? 'no-drop': ''};
    :focus + label {
      font-size: 0.7rem;
      top: -0.5rem;
      pointer-events: none;
    }
  }
  .visionBtn {
    display: ${props => props.showVisionBtn? '' : 'none'};
    cursor: pointer;
  }
`

interface IInvalidBlock {
  isHidden: boolean
}
const InvalidBlock = styled.span<IInvalidBlock>`
  font-size: 0.8rem;
  color: ${Color.lred};
  text-align: left;
  display: ${props => props.isHidden? 'none': 'block'};
`

interface IDataInputBox {
  id: string // this should be unique
  data: string
  dataName: string
  handleChange: (newData: string) => void
  warning?: string
  isPassword?: boolean
  readonly?:  boolean
  handleFocus?: () => void
}

const defaultProps = {
  warning: '',
  isPassword: false,
  readonly: false,
  handleFocus: () => {}
}

const DataInputBox: React.FC<IDataInputBox> = (options) => {
  const [visibility, setVisibility] = useState(false)
  const props = {
    ...defaultProps,
    ...options
  }

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
        floatLabel={props.data !== ''}
        showVisionBtn={props.isPassword && props.data !== ''}
        warn={props.warning !== ''}
        readOnly={props.readonly}
      >
        <input 
          id={props.id}
          className='dataInputArea'
          value={props.data} 
          onClick={handleOnClick} 
          onChange={handleOnChange} 
          type={inputType}
          required
          readOnly={props.readonly}
        />
        <label 
          htmlFor={props.id}
        > 
          {props.dataName}
        </label>
        <div
          className='visionBtn'
          onClick={toggleVisibility}
        >
          <IconContext.Provider value={{size: "1.5rem"}}>
            {visionIcon}
          </IconContext.Provider>
        </div>
      </StyledInputBox>
      <InvalidBlock 
        isHidden={props.warning === ''}>
        <RiErrorWarningFill /> {props.warning}
      </InvalidBlock>
    </>
    
  )
}

export default DataInputBox