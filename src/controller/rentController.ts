import { PrismaClient } from "@prisma/client"
import { Request, Response, response } from "express"
import { date } from "joi"

// create an object of prisma
const prisma = new PrismaClient()

// create a function to "create new event"
// asyncronous adalah fungsi yang berjalan secara paralel
const createRent = async (request: Request, response: Response) => {
    try {
        // read a request from body
        const namaPenyewa = request.body.namaPenyewa
        const carID= Number(request.body.carID)
        const tanggal = new Date (request.body.tanggal).toISOString()
        const lamaSewa = request.body.lamaSewa
        

        // insert to events table using prisma
                const car = await prisma.car.findFirst({ where: { carID:carID } })
        if (!car) {
            return response.status(400).json({
                status: false,
                message: "Data car not found"
            })
        }
        const totalBayar = car.hargaPerhari* lamaSewa    
        
        const newData = await prisma.rent.create({
            data: {
                namaPenyewa: namaPenyewa,
                carID:carID,
                tanggal: tanggal,
                lamaSewa: lamaSewa,
                totalBayar: totalBayar
            }
        })

        return response
            .status(200)
            .json({
                status: true,
                message: "rent has been created",
                data: newData
            })

    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })

    }
}

// create function to READ events
const readRent = async (request: Request, response: Response) => {
   try {
    const dataRent = await prisma.rent.findMany()
    return response
    .status(200).json({
        status: true,
        message:"rent has been louded",
        data: dataRent
    })
    
   } catch (error) {
    return response.status(500).json({
        status: false,
        message: error
    })
    
   }}
/function for update event/
const updateRent = async (request: Request, response: Response) => {
    try {
        //**read eventID yang dikirimkan dari URL */ 
        const rentID = request.params.rentID
        /* read data perubahan*/
        const namaPenyewa = request.body.namaPenyewa
        const carID = Number(request.body.carID)
        const tanggal = new Date (request.body.tanggal).toISOString();
        const lamaSewa = request.body.lamaSewa
        const totalBayar = request.body.totalBayar
        


        
        const findRent = await prisma.rent.findFirst({
            where: { rentID: Number(rentID) }
        })

        if (!findRent) {
            //**give a respon when event not found */ 
            return response.status(400)
                .json({
                    status: false,
                    message: 'Data rent not found'
                })
        }

        const dataRent = await prisma.rent.update({
            where: { rentID: Number(rentID) },
            data: {
                namaPenyewa: namaPenyewa|| findRent.namaPenyewa,
                carID: carID || findRent.carID,
                tanggal: tanggal || findRent.tanggal,
                lamaSewa: lamaSewa || findRent.lamaSewa,
                totalBayar: totalBayar || findRent.totalBayar
            
            }
        })

        return response.status (200)
        .json({
            status: true,
            message:"Rent has been updated",
            data: dataRent
        })


    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })


    }

}
/create a function to delete event/
const deleteRent =async (request:Request, response: Response) => {
    try {
        /get event ID from URL/
        const rentID = request.params.rentID
        
       
        const findRent = await prisma.rent.findFirst({
            where: {rentID: Number(rentID)}
        }) 

        if(!findRent){
            return response.status(400)
            .json({
                status: false,
                message: "Rent not found"
            })
        }

        /execute for delete event/
        const dataRent = await prisma.rent.delete({
            where: {rentID: Number(rentID)}
        }) 

        return response.status(200)
        .json({
            status: true,
            message: "Data rent has been deleted"
        })
        
    } catch (error) {
        return response
        .status(500)
        .json({
            status: false,
            message: error
        })

        
    }

    
} 
export { createRent, readRent, updateRent, deleteRent}