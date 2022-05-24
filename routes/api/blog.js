import express from 'express'
import connect from '../../mySqlConnect.js'

const routerApiBlogs = express.Router()

routerApiBlogs.get('/', async(req, res) =>{
    try{
        const [data] =  await connect.query(`
        SELECT *
        FROM blogs.blog
        `)
        res.send(data)
    }catch (err){
        res.send({err})
    }
})

export default routerApiBlogs