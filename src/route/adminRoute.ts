import express from "express";
import { createAdmin, deleteAdmin, login, readAdmin, updateAdmin } from "../controller/adminController"
import { verifyAdmin } from "../middleware/verifyAdmin";
const app = express()

// allow to reaf a json from body
app.use(express.json())

// addres for get event data
app.get(`/admin`,verifyAdmin, readAdmin)
// addres for add new event
app.post(`/admin`,verifyAdmin, createAdmin)

//**address for update event */ 
app.put(`/admin/:adminID`,verifyAdmin, updateAdmin)
/*address for delete event*/
app.delete(`/admin/:adminID`,verifyAdmin, deleteAdmin) 
app.post(`/admin/login`, login)

export default app