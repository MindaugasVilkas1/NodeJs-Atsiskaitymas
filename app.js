import 'dotenv/config'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'

const app = express();
const PORT = process.env.PORT || 8000

//Embedded JavaScript templates
app.set('views', path.resolve('views'));
app.set('view engine', 'ejs');

//cookie parser and express json
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve('public')));

app.get('/', (req, res)=>{
    res.send("Serveris veikia")
})

app.listen(PORT, () => console.log (`Server running on ${PORT} porto`))