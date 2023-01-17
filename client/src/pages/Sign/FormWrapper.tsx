import styled from 'styled-components'
import { Color } from '../../utils/color'

const FormWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translateX(-50%);
  padding: 40px 25px; 
  width: 400px;
  border-style: solid;
  border-color: lightgray;
  border-radius: 10px;
  background-color: ${Color.regrey}; 
  box-shadow: 0px 2px 6px -2px rgba(0,0,0,0.3);
`

export default FormWrapper