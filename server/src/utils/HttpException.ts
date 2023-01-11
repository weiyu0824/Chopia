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

export class InvalidAPIError extends HttpException {
  constructor(status=401, message='Your API call missed something'){
    super(status, message)
  }
}

export class AlreadyLogoutError extends HttpException {
  constructor(status=400, message='You have already logged out'){
    super(status, message)
  }
}

export class WrongDataError extends HttpException {
  constructor(status=400, message='The data you provided is wrong'){
    super(status, message)
  }
}
