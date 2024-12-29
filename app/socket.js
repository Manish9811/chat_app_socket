"use client";

import { io } from "socket.io-client";

export const socket = io('https://socketapp-11814d460297.herokuapp.com',{
    transports: ['websocket'], // Force WebSocket transport
});