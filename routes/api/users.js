import express from 'express'
import connect from '../../mySqlConnect.js'

const routerApiUsers = express.Router()

routerApiUsers.get('/', async(req, res) =>{
    try{
        const [data] =  await connect.query(`
        SELECT user.name, user.email
        FROM blogs.user    
        `)
        res.send(data)
    }catch (err){
        res.send({err})
    }
})

export default routerApiUsers