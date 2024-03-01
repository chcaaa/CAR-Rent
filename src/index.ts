import express, {Request, Response} from "express"
import adminRoute from "./route/adminRoute"
import carRoute from "./route/carRoute"
import rentRoute from "./route/rentRoute"

const app = express()
app.use(express.json())
const PORT = 8000

app.use(adminRoute)
app.use(carRoute)
app.use(rentRoute)


app.listen (PORT, () => {
    console.log(`server running on port ${PORT}`);
})
