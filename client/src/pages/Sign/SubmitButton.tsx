import styled from 'styled-components'
import { Color } from '../../utils/color'

interface Props {
  allowToSubmit: boolean
}
const SubmitButton = styled.button<Props>`
  margin: 10px 0px;
  border-radius: 5px;
  border-style: none;
  padding: 10px;
  background-color: ${Color.sogrey};
  color: ${Color.dogrey};
  pointer-events: ${props => props.allowToSubmit? '': 'none'};

  /* TODO: Why hover not working */
  &:hover {
    /* opacity: 0.5; */
    background-color: ${Color.yellow};
    color: ${Color.lagrey};
  }
`

export default SubmitButton