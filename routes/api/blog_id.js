import express from 'express'
import connect from '../../mySqlConnect.js'
import isAuthed from '../../middleware.js'

const routerApiBlogId = express.Router()

routerApiBlogId.get('/:id', async(req, res) =>{
    try{
        const [data] =  await connect.query(`
        SELECT *
        FROM blogs.blog
        WHERE id=?`, [req.params.id])
        res.send(data)
    }catch (err){
        res.send({err})
    }
})
routerApiBlogId.delete('/:id', async(req, res) =>{
    try{
         const [data] = await connect.query(`DELETE FROM 
         blogs.blog 
         WHERE id = ?`, [req.params.id])
    } catch (err){
        res.send({err})
    }
});


export default routerApiBlogId