import 'dotenv/config'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import routerApiUsers from './routes/api/users.js'
import routerApiUsersId from './routes/api/users_id.js'
import routerApiBlogs from './routes/api/blog.js'
import routerApiBlogId from './routes/api/blog_id.js'
import routerHome from './routes/ui/home.js'
import routerRegister from './routes/ui/register.js'
import routerLogin from './routes/ui/login.js'
import routerLogout from './routes/ui/logout.js'

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

app.use('/logout', routerLogout)
app.use('/login', routerLogin)
app.use('/register', routerRegister)
app.use('/', routerHome)
app.use('/api/blog/id/', routerApiBlogId)
app.use('/api/blog', routerApiBlogs)
app.use('/api/users/id', routerApiUsersId )
app.use('/api/users', routerApiUsers)
app.listen(PORT, () => console.log (`Server running on ${PORT} porto`))