"use client";

import { io } from "socket.io-client";

export const socket = io(process.env.NODE_ENV == 'production' ? 'wss://socketapp-11814d460297.herokuapp.com':"http://localhost:3000")