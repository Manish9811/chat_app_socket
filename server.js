import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';
import dotenv from 'dotenv';
import cors from 'cors'
import { all } from 'axios';

dotenv.config();  // Load environment variables from .env file


console.log("node env" + process.env.NODE_ENV)
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
const port = process.env.PORT || 4000;

console.log(port)

// Ensure that Next.js is fully prepared before proceeding
nextApp.prepare().then(() => {

    // Create HTTP server and attach Socket.IO
    const httpServer = createServer(app);
    const io = new Server(httpServer, {cors :{
      origin: ['https://socketapp-11814d460297.herokuapp.com'],
      credentials: true
    }
  });
  
  app.use({cors: {
    origin:['https://socketapp-11814d460297.herokuapp.com'],
    credentials: true
  }})
  // Serve API routes (if any)

  // For all other requests, let Next.js handle routing
  app.all('*', (req, res) => {
    return handle(req, res); // Next.js will handle this request
  });

  app.get('/', (req,res)=>{
    return res.json({
      message : "all good"
    })
  })





  const allUsers = new Map();

  io.on('connection', (socket) => {


    socket.on('loginSuccess', ({ userEmail }) => {
      allUsers.set(userEmail, socket.id)
      socket.emit('loginSuccess', userEmail)
      socket.broadcast.emit('newUserDetected', userEmail);
    })

    socket.on('allConnectedUserEmail', () => {
      const userData = Array.from(allUsers.keys())
      socket.broadcast.emit("allUserData", [...userData]);
      socket.emit("allUserData", [...userData])
    })

    socket.on('messageSent', ({ loginUser, by, to, sendMessage }) => {
      const receiver = allUsers.get(to);
      let clientMessage;
      console.log(loginUser , by , to)
      if (loginUser == by) {
        clientMessage =
        {
          sender: by,
          receiver: to,
          message: sendMessage
        }
      }

      else {
        clientMessage =
        {
          sender: to,
          receiver: by,
          message: sendMessage
        }
      }
      socket.to(receiver).emit("transferMessage", clientMessage);

    })

    socket.on('disconnect', () => {
      const logoutUser = socket.id;

      console.log(allUsers.size)
      allUsers.forEach((key, value) => {
        if (key == logoutUser) {
          allUsers.delete(value);
        }
      })
      const userData = Array.from(allUsers.keys())
      socket.broadcast.emit("allUserData", [...userData]);
      socket.emit("allUserData", [...userData])

    })

    // socket.disconnect(true); // Forcefully disconnect the socket



  });

  // Start the server
  httpServer.listen(port, () => {
    console.log(`> Server is running on http://localhost:${port}`);
  });


});
