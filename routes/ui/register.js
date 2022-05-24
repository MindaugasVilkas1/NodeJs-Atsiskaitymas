import express from 'express';
import bcrypt from 'bcrypt';
import connect from '../../mySQLConnect.js';

const routerRegister = express.Router();

routerRegister.get('/', (req, res) => {
    res.render('register',{
        title: 'Registration Form',
    })
});

routerRegister.post('/', async(req, res)=>{
    try{
        console.log(req.body)
        const register_time = new Date().toLocaleString('LT')
        const hashedPass = await bcrypt.hash(req.body.password, 10)
        if(createUser_validation(req.body)){
            await connect.query(`
            INSERT INTO blogs.user SET ?
            `,{
                name:req.body.username,
                email:req.body.email,
                password:hashedPass,
                register_time:register_time
            })
           return res.redirect('/')
        }else{
           return res.send('Something wrong with registration data') 
        }
    }catch (err){
        console.log(err)
      return  res.status(500).send({err:`registration err: ${err}`})
    }
})

let createUser_validation = body => {
    if(
      body.email.includes('@') &&
      body.email.includes('.') &&
      body.password === body.password_Repeat &&
      body.password.length >= 8 &&
      /[0-9]/.test(body.password) &&
      /[A-Z]/.test(body.password) &&
      /[a-z]/.test(body.password)
    ){
      return true;
    }
  }

  export default routerRegister;