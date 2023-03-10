const { isAuth, isAdmin } = require("../../middlewares/auth");
const {postAutor, getAutores} = require("./autores.controller")
const autoresRouter = require("express").Router();

autoresRouter.post("/",[isAdmin], postAutor);
autoresRouter.get("/getAutor",[isAuth], getAutores)

module.exports = autoresRouter;