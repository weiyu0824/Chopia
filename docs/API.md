# APIs
This document contains both clients-side routes and server-side APIs

# Client Routes
- `/`: Home page for the application
- `/signuin` & `signup`: For login and register account
- `/inbox/userId`: A message box of your friend & you
- `/notification`: Notification box
- `/goverify?id=&email=`: A verification page when the email is unverified
- `/verify?id=&token`: A page for user to verify email page

# Server API
All api urls start from `/api`
## Authentication related
- POST `/auth/login`
```json
//body
{
    email, password
}
```
- POST `/auth/register`
```json
//body
{
    email, password
}
```
- DELETE `/auth/logout`
- GET `/auth/refresh`
- POST `/auth/login-with-token`
```json
//body
{
    token
}
```
- POST `/auth/verify`
```json
//body
{
    userId, verificationToken
}
```
- POST `/auth/send-mail`


## Chat related
Real-time chat messages are transmitted through web socket
- GET `/chat/private/:friendUserId`

## ML related
- GET `/ml/summery/friendId`

## Notification related
- GET `/`: get all the notifications
- DELETE `/:notifId`: remove the specific notification

## User related

- GET `/search`
```json
// query
{
    username?, email?
}
```
- PUT `/add-friend`: send friend request to other users
```jsonld
{
    friendId
}
```
- PUT `/edit-profile`
```jsonld
{
    name, username, avatar
}
```
- PUT `/change-password`
```jsonld
{
    oldPassword, newPassword
}
```
- PUT `/accept-friend`: accept friend request
```jsonld
{
    friendId, notifId
}
```