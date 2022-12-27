import styled from 'styled-components'

interface Props {
  isHidden: boolean
}
const WarningBlock = styled.div<Props>`
  margin: 10px 0px;
  padding: 10px;
  color: red;
  border-radius: 5px;
  border-style: none;
  background-color: #FFE1E1;
  display: ${props => props.isHidden ? 'none' : 'block'};
`

export default WarningBlock