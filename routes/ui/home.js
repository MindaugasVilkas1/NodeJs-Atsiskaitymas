import express from 'express'
import connect from '../../mySqlConnect.js'
import isLogedIn from '../../isLogedIn.js';

const routerHome = express.Router();

routerHome.get('/', async(req, res) =>{
    try{
        //sort
        let sortBy = req.query.sortBy
        let sortAscDesc = req.query.sortAscDesc
        if (sortBy === undefined || sortBy === 'null') {
            sortBy = 'id'
        } else {
            sortBy = req.query.sortBy
        }
        if (sortAscDesc === undefined || sortAscDesc === 'increasing') {
            sortAscDesc = 'ASC'
        } else {
            sortAscDesc = 'DESC'
        }
        const auth = await isLogedIn(req)
        const [data] = await connect.query(`
        SELECT blog.title, blog.content, blog.author_id, blog.create_at, user.id, user.name, user.email
        FROM blog
        JOIN blogs.user
        ON user.id=blog.author_id
        ORDER BY ${sortBy} ${sortAscDesc}
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