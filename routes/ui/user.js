import express from 'express'
import connect from '../../mySqlConnect.js'
import isAuthed from '../../middleware.js'
const routerUser = express.Router()

routerUser.get('/:id',isAuthed, async(req, res) =>{
    try{
        const [data] =  await connect.query(`
        SELECT *
        FROM blogs.user
        JOIN blogs.blog
        ON blog.author_id=blogs.user.id
        WHERE author_id=?`, [req.params.id])
        res.render('user', {
            title:'My Blogs',
            addBlog:'Add New Blog',
            data:data,
            vartotojas:req.email,
            css:'main.css',
            js:'user.js'
        })
    }catch (err){
        res.send({err})
    }
})

routerUser.post('/',isAuthed, async(req, res)=>{
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
            res.send(data)
            console.log({err})
    }catch (err){
      
        res.send({err})
    }
})

export default routerUser;