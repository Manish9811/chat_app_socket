"use client";

import { io } from "socket.io-client";

export const socket = io('https://chat-app-socket-eta.vercel.app');