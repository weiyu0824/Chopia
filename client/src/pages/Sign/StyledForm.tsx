import styled from 'styled-components'
import { Color } from '../../utils/color'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${Color.white};
  .signinHeader{
    color: ${Color.ddblue};
    text-align: left;
  };
  .signinLink{
    color: ${Color.dblue};
    text-align: right;
  }

`

export default StyledForm