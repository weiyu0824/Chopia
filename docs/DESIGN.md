# DESIGN
This file contains detail design and information about our project

## System Architecture

The entire backend service consists of 4 main component. API-Server, Chat-Server, Notification-Server, and Database.
- **API Server** is responsible for all the http-requests.
- **Chat Server** is responsible for only chat messages. Whenever receiving a message, it would dispatch this message to other user if he/she is online, otherwise just store this message in the DB
- **Notification Server** would send notification instantly to other users if if he/she is online
- **Database**, a mongodb database. 

### Architecture
<img width="748" alt="Screen Shot 2023-01-13 at 1 45 48 AM" src="https://user-images.githubusercontent.com/62784299/212268322-78ddb2f4-ebc0-4584-ae52-2c8a79740639.png">

## Summerization Algorithm
