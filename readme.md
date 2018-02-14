# ReactJS/ExpressJS starter kit

Client/Server boilerplate using the following technologies:
-----------------------------------------------------------

- [ES2015 with Babel (Server/Client)](https://babeljs.io/learn-es2015/)
- [ReactJS](https://reactjs.org/)
- [React-router-V4](https://reacttraining.com/react-router/)
- [ExpressJS](http://expressjs.com/es/)
- [Mongoose](http://mongoosejs.com/)
- [JWT-Authentication](https://jwt.io/)
- [Socket.IO](https://socket.io/)
- [Webpack](https://webpack.js.org/) -> *Internally with HMR*

##### create-react-app has been used to create the client app


Setup
-----

#### Clone the repo and run:

### `npm i`

#### To serve the app in dev mode run:

### `npm start` -> It will run both, server and client app

*It will run the client app on `http://localhost:3000` (with HMR) and the server on `http://localhost:3001`*

#### To deploy the app in production mode run:

### `npm run deploy`

### Login

To Login in the app for the first time, User: admin Password: admin, then you can create you user in a DB hosted in mlab under the Users tab


Debugging with VSCode
---------------------

Also if you're using **VSCode**, you can debbug both, Server and Client app in development

- First press F5 to start VSCode debugger on the Server, you can add breakpoints on the server code.
- Then open the ./client folder in a new instance of VSCode.
- Run `npm start` and then press F5, it will run the debugger for the client app on VSCode and open an instance of the browser.
- Now you´re ready to debug your app.