import express from "express";
import { createCar, deleteCar, readCar, updateCar } from "../controller/carController"
const app = express()

// allow to reaf a json from body
app.use(express.json())

// addres for get event data
app.get(`/car`, readCar)
// addres for add new event
app.post(`/car`, createCar)

//**address for update event */ 
app.put(`/car/:eventID`, updateCar)
/*address for delete event*/
app.delete(`/car/:eventID`, deleteCar) 

export default app