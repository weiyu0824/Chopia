import styled from 'styled-components'
import { Color } from '../../utils/color'

interface Props {
  allowToSubmit: boolean
}
const SubmitButton = styled.button<Props>`
  margin: 10px 0px;
  padding: 10px;
  color: white;
  border-radius: 5px;
  border-style: none;
  background-color: ${Color.dblue};
  pointer-events: ${props => props.allowToSubmit? '': 'none'};

  /* TODO: Why hover not working */
  &:hover {
    opacity: 0.5;
    background-color: black;
  }
`

export default SubmitButton