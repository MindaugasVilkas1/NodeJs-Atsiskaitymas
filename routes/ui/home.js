import express from 'express'
import connect from '../../mySqlConnect.js'
import isLogedIn from '../../isLogedIn.js';

const routerHome = express.Router();

routerHome.get('/', async(req, res) =>{
    try{
        const auth = await isLogedIn(req)
        const [data] = await connect.query(`
        SELECT blog.title, blog.content, blog.author_id, blog.create_at, user.id, user.name, user.email
        FROM blog
        JOIN blogs.user
        ON user.id=blog.author_id
        `)
        res.render('home', {
            title: 'The Unpretentious Guide To Luxury Travel',
            data:data,
            auth: auth,
            token:req.token,
            css:'main.css'
        })
    }catch (err){
        console.log(err)
        res.send({err:`Susidureme su err ${err}`})
    }
})
export default routerHome;