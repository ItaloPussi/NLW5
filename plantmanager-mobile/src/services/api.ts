import axios from "axios"

export const api = axios.create({
    baseURL: process.env.FAKE_DB || "http://192.168.0.4:3333"
})