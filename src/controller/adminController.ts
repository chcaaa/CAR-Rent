import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import md5 from "md5"
import {sign} from "jsonwebtoken"

// create an object of prisma
const prisma = new PrismaClient()

// create a function to "create new event"
// asyncronous adalah fungsi yang berjalan secara paralel
const createAdmin = async (request: Request, response: Response) => {
    try {
        // read a request from body
        const namaAdmin = request.body.namaAdmin
        const email = request.body.email
        const password = request.body.password
        

        // insert to events table using prisma
        const newData = await prisma.admin.create({
            data: {
                namaAdmin: namaAdmin,
                email: email,
                password: password,
               
            }
        })

        return response
            .status(200)
            .json({
                status: true,
                message: `admin has been created`,
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
const readAdmin = async (request: Request, response: Response) => {
    try {
        const page= Number(request.query.page) || 1;
        const qty = Number(request.query.qty) || 10;
        const keyword=request.query.keyword?.toString() || "";
        const dataAdmin = await prisma.admin.findMany({
             take: qty, //mendefinisikan jumlah data yang diambil
             skip: (page - 1) * qty,
             where:{
                OR: [
                    {namaAdmin: {contains: keyword}},
                    {password: {contains: keyword}}

                ]
             },
             orderBy: {namaAdmin: "asc"}
             

        })
        // await untuk menunggu async
        return response
            .status(200)
            .json({
                status: true,
                message: `admin has been louded`,
                data: dataAdmin
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
const updateAdmin = async (request: Request, response: Response) => {
    try {
        //**read eventID yang dikirimkan dari URL */ 
        const adminID = request.params.adminID
        /* read data perubahan*/
        const namaAdmin = request.body.namaAdmin
        const email = request.body.email
        const password = request.body.password
        


        /*pastikan data sudah ada*/
        const findAdmin = await prisma.admin.findFirst({
            where: { adminID: Number(adminID) }
        })

        if (!findAdmin) {
            //**give a respon when event not found */ 
            return response.status(400)
                .json({
                    status: false,
                    message: 'Data admin not found'
                })
        }

        const dataAdmin = await prisma.admin.update({
            where: { adminID: Number(adminID) },
            data: {
                namaAdmin: namaAdmin || findAdmin.namaAdmin,
                email: email || findAdmin.email,
                password: password || findAdmin.password,
            
            }
        })

        return response.status (200)
        .json({
            status: true,
            message:`Admin has been updated`,
            data: dataAdmin
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
const deleteAdmin =async (request:Request, response: Response) => {
    try {
        /*get event ID from URL*/
        const adminID = request.params.adminID
        
        /*make sure the event is exist*/
        const findAdmin = await prisma.admin.findFirst({
            where: {adminID: Number(adminID)}
        }) 

        if(!findAdmin){
            return response.status(400)
            .json({
                status: false,
                message: `Admin not found`
            })
        }

        /*execute for delete event*/
        const dataEvent = await prisma.admin.delete({
            where: {adminID: Number(adminID)}
        }) 

        return response.status(200)
        .json({
            status: true,
            message: `Data admin has been deleted`
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

const login= async (request:Request, response: Response) => {
    try {
        /*get event ID from URL*/
        const adminID = request.params.adminID
        
        /*make sure the event is exist*/
        const findAdmin = await prisma.admin.findFirst({
            where: {adminID: Number(adminID)}
        }) 

        if(!findAdmin){
            return response.status(400)
            .json({
                status: false,
                message: `Admin not found`
            })
        }
    } catch (error) {
        return response.status(500).json({
            status: false,
            message:`error`
        })
        
    }
}

export { createAdmin, readAdmin, updateAdmin, deleteAdmin, login}
