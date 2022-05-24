import express from 'express'
import connect from '../../mySqlConnect.js'
import isAuthed from '../../middleware.js'

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
routerApiBlogs.post('/', isAuthed, async(req, res)=>{
    try{
        const create_at = new Date().toLocaleString('LT')
        const [data] = await connect.query
        (`INSERT INTO blog SET ?
            `, {
                author_id:req.id,
                title:req.body.title,
                content:req.body.content,
                create_at:create_at
            })
            res.redirect(`/user/${req.id}`)
    }catch (err){
        res.send({err})
    }
})

routerApiBlogs.delete('/:id',isAuthed, async(req, res) =>{
    try{
         const [data] = await connect.query(`DELETE FROM blog WHERE id = ?`, [req.params.id])
         res.send(data)
    } catch (err){
        res.send({err})
    }
});


export default routerApiBlogs