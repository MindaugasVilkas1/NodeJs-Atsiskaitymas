import jwt from 'jsonwebtoken'
import 'dotenv/config'
export default async function isLogedIn(req) {
    if (req.cookies.access_token) {
        const token = req.cookies.access_token;
        const bool = jwt.verify(token, process.env.SECRET_JWT_TOKEN, (err, result) => {
            if (err) return false
            req.token = result
            return true
        })
        return bool
    } else {
        return false
    }

}