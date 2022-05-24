import 'dotenv/config';
import express from 'express'
import connect from '../../mySQLConnect.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const routerLogin = express.Router();
routerLogin.get('/', (req, res) => {
    res.render('login',{
        title: 'Login to my Acount',
    })
});

routerLogin.post('/', async(req, res)=>{
    try{
        const [data] = await connect.query(`
        SELECT * from blogs.user
        WHERE user.email = ?
        `, [req.body.email])
        if(data.length === 0){
            return res.status(400).send({err:`Incorrect email or password`})
        }
        const passCompare = await bcrypt.compare(req.body.password, data[0].password)
        if(passCompare) {
            const privateKey = process.env.SECRET_JWT_TOKEN
            const token = jwt.sign({id:data[0].id, email: req.body.email,},
                privateKey, { expiresIn: '1d'});
            return res.cookie('access_token', token,{
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
            .status(200)
            .redirect('/')
        }else{
            return res.status(400).send({ err: `incorrect email or password` })
        }
    }catch (err){
        return res.status(400).send({ err: `We have ${err}` }); 
    }
})

export default routerLogin