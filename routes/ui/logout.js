import express from 'express'
import isAuthed from '../../middleware.js'

const routerLogout = express.Router()

routerLogout.get("/", isAuthed, (req, res) => {
    return res
      .clearCookie("access_token")
      .status(200)
      .redirect('/');
  });

  export default routerLogout