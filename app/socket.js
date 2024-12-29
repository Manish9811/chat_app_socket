"use client";

import { io } from "socket.io-client";

export const socket = io('wss://socketapp-11814d460297.herokuapp.com',{
    reconnectionAttempts: 5, // Try to reconnect 5 times before giving up
  reconnectionDelay: 1000,
});