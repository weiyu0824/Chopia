const emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

interface ICondition {
  required?: boolean
  allowWhiteSpace?: boolean
  type?: 'email' | 'password' | 'username' | 'name' | 'none'
}
const defaultCondition = {
  required: true,
  allowWhiteSpace: false,
  type: 'none'
}
const validate = (data: string, options: ICondition) => {
  const condition = {
    ...defaultCondition,
    ...options
  }

  if (condition.required && data === '') {
    return 'Required'
  }
  if (!condition.allowWhiteSpace && /\s/.test(data)) {
    return 'White space is not allowed'
  }
  if (condition.type === 'email' && !data.match(emailformat)){
    return 'Invalid email address'
  }
  if (condition.type === 'password' && data.length < 8) {
    return 'Password should contain at least 8 characters'
  }
  if (condition.type === 'username' && data.length < 6) {
    return 'Username should contain at least 6 characters'
  }
  if (condition.type === 'username' && data.includes('@')) {
    return 'Username should not contain @ character'
  }
  if (condition.type === 'name' && data.length > 30) {
    return 'Name should be less than 30 characters'
  }
  return ''
}

export {
  validate
}
