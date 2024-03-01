import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

// create an object of prisma
const prisma = new PrismaClient()

// create a function to "create new event"
// asyncronous adalah fungsi yang berjalan secara paralel
const createCar = async (request: Request, response: Response) => {
    try {
        // read a request from body
        const nopol = request.body.nopol
        const merkMobil = request.body.merkMobil
        const hargaPerhari = Number(request.body.hargaPerhari)
        

        // insert to events table using prisma
        const newData = await prisma.car.create({
            data: {
                nopol: nopol,
                merkMobil: merkMobil,
                hargaPerhari: hargaPerhari,
               
            }
        })

        return response
            .status(200)
            .json({
                status: true,
                message: `car has been created`,
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
const readCar = async (request: Request, response: Response) => {
    try {
        const page= Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 10;
        const keyword=request.query.keyword?.toString() || "";
        const dataCar = await prisma.car.findMany({
             take: qty, //mendefinisikan jumlah data yang diambil
             skip: (page - 1) * qty,
             where:{
                OR: [
                    {merkMobil: {contains: keyword}},
                    {nopol: {contains: keyword}}

                ]
             },
             orderBy: {merkMobil: "asc"}
             

        })
        // await untuk menunggu async
        return response
            .status(200)
            .json({
                status: true,
                message: `car has been louded`,
                data: dataCar
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
/*function for update event*/
const updateCar = async (request: Request, response: Response) => {
    try {
        //**read eventID yang dikirimkan dari URL */ 
        const carID = request.params.carID
        /* read data perubahan*/
        const nopol = request.body.nopol
        const merkMobil = request.body.merkMobil
        const hargaPerhari = Number(request.body.hargaPerhari)
        


        /*pastikan data sudah ada*/
        const findCar = await prisma.car.findFirst({
            where: { carID: Number(carID) }
        })

        if (!findCar) {
            //**give a respon when event not found */ 
            return response.status(400)
                .json({
                    status: false,
                    message: 'Data car not found'
                })
        }

        const dataCar = await prisma.car.update({
            where: { carID: Number(carID) },
            data: {
                merkMobil: merkMobil || findCar.merkMobil,
                nopol: nopol || findCar.nopol,
                hargaPerhari: hargaPerhari || findCar.hargaPerhari,
            
            }
        })

        return response.status (200)
        .json({
            status: true,
            message:`car has been updated`,
            data: dataCar
        
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
/*create a function to delete event*/
const deleteCar =async (request:Request, response: Response) => {
    try {
        /*get event ID from URL*/
        const carID = request.params.carID
        
        /*make sure the event is exist*/
        const findCar = await prisma.car.findFirst({
            where: {carID: Number(carID)}
        }) 

        if(!findCar){
            return response.status(400)
            .json({
                status: false,
                message: `car not found`
            })
        }

        /*execute for delete event*/
        const dataCar = await prisma.car.delete({
            where: {carID: Number(carID)}
        }) 

        return response.status(200)
        .json({
            status: true,
            message: `Data car has been deleted`
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
export { createCar, readCar, updateCar, deleteCar}
