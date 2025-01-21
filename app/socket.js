"use client";

import { io } from "socket.io-client";

export const socket = io(`${process.env.NEXT_PUBLIC_NODE_ENV == 'production'?'https://socketapp-11814d460297.herokuapp.com':'http://localhost:3000'}`)