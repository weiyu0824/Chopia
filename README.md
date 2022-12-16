# CS546 Final Project - Real Time Knowledge Management for Conversation
Repo for UIUC CS546 Adv NLP Course Final Project on Real Time Knowledge Management for Conversation.

# Overview

## Motivation
When people are discussing  and brainstorming, (1) structuralizing content and (2) having summaries are important. They help formulate a clear discussion flow and also expand content exploration.
## Solution
We developed a chatroom platform with a tool to help people structuralized their conversations and also give real-time summaries while chatting.


# Environment

To run the chatroom platform application, set up the environment:

## MongoDB

1. Install MongoDB

2. After downloaded the mongo databse, we could use homebrew to run the database
```
brew services run mongodb-community
brew services stop mongodb-community
brew services list
mongosh
```
3. Download Mongo Compass (Optional)
This a desktop tool that can easily operate on the local mongodb https://www.mongodb.com/try/download/compass

## Conda Environment

Create a conda environment with python version specifies as 3.8.15

```
python 3.8.15
```


# Usage
To run the application, on the ./server side, run:

```
npm install
npm run dev
```
And it starts listening on the port `8088` and connect to  `mongodb://localhost:27017/chatroom`

On the ./client side, run:

```
npm install
npm run start
```

And it will be deployed on local host  `http://localhost:3000`

# Authors and acknowledgment
Mu-Chun Wang
Wei-Yu Lin
Yi-Chun Pan
