export class HttpException extends Error {
  status: number
  override message: string

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
  }
}

export class NoTokenError extends HttpException {
  constructor(status=401, message='Without token, not allowed to access this resources') {
    super(status, message)
  }
}

export class InvalidTokenError extends HttpException {
  constructor(status=401, message='This token is invalid, please refresh or re-signin') {
    super(status, message)
  }
}

export class AccessDatabaseError extends HttpException {
  constructor(status=500, message='Access Database error'){
    super(status, message)
  }
}
