import express from 'express'
import connect from '../../mySqlConnect.js'

const routerApiUsersId = express.Router()

routerApiUsersId.get('/:id', async(req, res) =>{
    try{
        const [data] =  await connect.query(`
        SELECT user.name, user.email
        FROM blogs.user
        WHERE id=?`, [req.params.id])
        res.send(data)
    }catch (err){
        res.send({err})
    }
})

export default routerApiUsersId