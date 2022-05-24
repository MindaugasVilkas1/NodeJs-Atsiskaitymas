import express from 'express'
import connect from '../../mySqlConnect.js'
import isAuthed from '../../middleware.js'
const routerUser = express.Router()

routerUser.get('/:id',isAuthed, async(req, res) =>{
    try{
        const [data] =  await connect.query(`
        SELECT *
        FROM blogs.blog
        JOIN blogs.user
        ON user.id=blog.author_id
        WHERE author_id=?`, [req.params.id])
        res.render('user', {
            title:'My Blogs',
            data:data,
            vartotojas:req.email,
            css:'/main.css'
        })
    }catch (err){
        res.send({err})
    }
})

export default routerUser;