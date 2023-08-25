import axios from "axios";
import PocketBase from 'pocketbase';

export const api = axios.create({
  headers: {
    Authorization: 123,
  },
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});



export const pb = new PocketBase('https://streaming.fly.dev');
