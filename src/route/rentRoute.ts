import express from "express";
import { createRent, deleteRent, readRent, updateRent } from "../controller/rentController";
const app = express()

// allow to reaf a json from body
app.use(express.json())

// addres for get event data
app.get(`/rent`, readRent)
// addres for add new event
app.post(`/rent`, createRent)

//**address for update event */ 
app.put(`/rent/:rentID`, updateRent)
/*address for delete event*/
app.delete(`/rent/:rentID`, deleteRent) 

export default app