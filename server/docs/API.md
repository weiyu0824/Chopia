# API 
## Auth
### Login
- Post `api/auth/login` 
```json
    "username": string,
    "password": string,
```

### Register
- Post `api/auth/register` 
```json
    "username": string,
    "password": string,
```

### Refresh 

### Logout 
- Delete `api/auth/logout`
```
Token: string
```

## Chat
### Get Chat
- Get `api/auth/chat/:friendUsername`
```
Result = {
    data = {
        message = [
            {messageText: 'Today is snowy day', senderUsername: 'ben'},
            {messageText: 'How is the weather in Taiwan', senderUsername: 'ben'}
        ]
    }
}
```
### Post Chat