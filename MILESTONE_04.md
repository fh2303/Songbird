# Milestone 04 - Final Project Documentation

## NetID

fh2303

## Name

Felix Hall

## Repository Link

https://github.com/nyu-csci-ua-0467-001-002-spring-26/final-project-fh2303

## URL for deployed site

https://final-project-fh2303.onrender.com/

## URL for form 1 (from previous milestone)

[(TODO: add link to a functioning form)](https://final-project-fh2303.onrender.com/messages)

## Special Instructions for Form 1

Click add room to open a form where you can input a title for a chat room. You can click back to cancel or after you press add. Click "Go to proplist" to see a list of proposals from the rooms you are currently a part of.

## URL for form 2 (for current milestone)

https://final-project-fh2303.onrender.com/register

## Special Instructions for Form 2

Enter an email address and password to register, the join us button will bring you to the login screen where you can input your credentials and enter the main page.

## URL for form 3 (from previous milestone)

https://final-project-fh2303.onrender.com/proplist

## Special Instructions for Form 3

Click on each proposal to expand it and see the information from the proposal. Click again to collapse.

## First link to github line number(s) for constructor, HOF, etc.

https://github.com/nyu-csci-ua-0467-001-002-spring-26/final-project-fh2303/blob/4e6665bbf8678a956800b2443f5662d9b0d2cd2d/app.js#L39

## Second link to github line number(s) for constructor, HOF, etc.

https://github.com/nyu-csci-ua-0467-001-002-spring-26/final-project-fh2303/blob/4e6665bbf8678a956800b2443f5662d9b0d2cd2d/app.js#L143-L151

## Short description for links above

First Link: This HOF takes a function to define which part of the user object should be stored in the session.

Second Link: This route is an HOF that chains together an authentication check and then a database query to securely deliver a user's list of rooms as a JSON response.

## Link to github line number(s) for schemas (db.js or models folder)

https://github.com/nyu-csci-ua-0467-001-002-spring-26/final-project-fh2303/blob/4e6665bbf8678a956800b2443f5662d9b0d2cd2d/db.js#L4-L52

## Description of research topics above with points

- (2 points) Used React framework to build each component and page of the app.
- (4 points) - Used Socket.io to create chat rooms and messaging between users.
- (3 points) Used Passport.js to manage user authentication by defining how to store, retrieve, and verify users.

## Links to github line number(s) for research topics described above (one link per line)

[(TODO: add link to github line number(s), one per line for research topics ... for example, if using auth/passport, link to auth.js or where bulk of auth code is)]

Passport.js - https://github.com/nyu-csci-ua-0467-001-002-spring-26/final-project-fh2303/blob/4e6665bbf8678a956800b2443f5662d9b0d2cd2d/app.js#L36-L79

Socket.io - https://github.com/nyu-csci-ua-0467-001-002-spring-26/final-project-fh2303/blob/4e6665bbf8678a956800b2443f5662d9b0d2cd2d/app.js#L202-L235

React - https://github.com/nyu-csci-ua-0467-001-002-spring-26/final-project-fh2303/blob/4e6665bbf8678a956800b2443f5662d9b0d2cd2d/front-end/src/pages/Messages/Messages.jsx#L8-L52

---

## Attributions

(TODO: list sources that you have based your code off of, 1 per line, with file name, a very short description, and an accompanying url... for example: routes/index.js - Authentication code based off of http://foo.bar/baz ... alternatively, if you have already placed annotations in your project, answer "See source code comments")

Passport authentication based off: https://medium.com/@allen6qihow-to-set-up-reactjs-redux-saga-and-passport-js-a5d1e7caca90

Socket join and leaving room framework based off:

- https://www.ctrix.pro/blog/nodejs-socket-io-rooms-guide
- https://socket.io/docs/v2/rooms/

React prop usage based off: https://react.dev/learn/passing-props-to-a-component
