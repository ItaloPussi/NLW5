import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.FAKE_DB || 'http://localhost:3333'
})