import styled from 'styled-components'

interface IWarningBlock {
  isHidden: boolean
}
const WarningBlock = styled.div<IWarningBlock>`
  display: ${props => props.isHidden ? 'none' : 'block'};
  margin: 10px 0px;
  border-style: none;
  border-radius: 5px;
  padding: 10px;
  background-color: #FFE1E1;
  /* text-align: left; */
  color: red;
`

export default WarningBlock