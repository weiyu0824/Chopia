import styled from 'styled-components'
import { Color } from '../../utils/color'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  color: ${Color.sogrey};
  .signinHeader{
    text-align: left;
  };
  .signinLink{
    color: ${Color.sogrey};
    text-align: right;
  }

`

export default StyledForm