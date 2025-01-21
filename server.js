import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();  // Load environment variables from .env file


console.log("node env" + process.env.NODE_ENV)
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const app = express();
const port = process.env.PORT || 4000;

console.log(process.env)

// Ensure that Next.js is fully prepared before proceeding
nextApp.prepare().then(() => {

    // Create HTTP server and attach Socket.IO
    const httpServer = createServer(app);
    const io = new Server(httpServer, {
      cors: {
        origin: `${process.env.NODE_ENV == 'production'?'https://socketapp-11814d460297.herokuapp.com':'http://localhost:3000'}`, // Allowed origins
        methods: '*',
        credentials: true,
      },
    });
  
    app.use(cors({
      origin: `${process.env.NODE_ENV == 'production'?'https://socketapp-11814d460297.herokuapp.com':'http://localhost:3000'}`, // Allowed origins
      methods:['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true, // Allow credentials
    }));
    app.options('*', cors());

    
  // Serve API routes (if any)

  // For all other requests, let Next.js handle routing
  app.all('*', (req, res) => {
    return handle(req, res); // Next.js will handle this request
  });


  const allUsers = new Map();

  io.on('connection', (socket) => {


    socket.on('loginSuccess', ({ loginUserId }) => {
      
      loginUserId && allUsers.set(loginUserId, socket.id);

      console.log(allUsers)


    })

    socket.on('messageSent', ({ loginUser, to, sendMessage }) => {
      console.log(loginUser, to, sendMessage)
      const receiver = allUsers.get(to);

      console.log(allUsers)

      console.log(to)

      socket.to(receiver).emit('messageReceive',{messageSentBy : loginUser, receivedBy : to, message : sendMessage})
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
