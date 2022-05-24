import 'dotenv/config'
import jwt from 'jsonwebtoken'

let isAuthed = (req, res, next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return res.status(401).send('Access denied! You do not have permission to get this content. Login')
    } 
    try{
        const data = jwt.verify(token, process.env.SECRET_JWT_TOKEN,)
        req.id = data.id
        req.email = data.email
       return next()
    }catch (err){
        res.send({err: `Login has expired. please log in`})
    }
}
export default isAuthed