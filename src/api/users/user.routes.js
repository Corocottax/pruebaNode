const { isAuth } = require("../../middlewares/auth");
const { singUp, login, modifyUser } = require("./user.controller");

const userRouter = require("express").Router();

userRouter.post("/", singUp);
userRouter.post("/login", login);
userRouter.put("/:id",[isAuth], modifyUser);

module.exports= userRouter;