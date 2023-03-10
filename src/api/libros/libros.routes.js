const { isAuth, isAdmin } = require("../../middlewares/auth");
const upload = require("../../middlewares/files");
const {getAllLibros, getlibroById, getByTitle, crearLibro, eliminarLibro, eliminarLibroTitulo, actulizarLibro} = require("./libros.controller");


const librosRouter = require("express").Router();

librosRouter.get("/", getAllLibros);
librosRouter.get("/:id",[isAuth], getlibroById);
librosRouter.get("/titulo/:titulo", getByTitle);
librosRouter.post("/",[isAdmin],upload.single("caratula"), crearLibro);
librosRouter.delete("/:id",[isAuth], eliminarLibro);
librosRouter.delete("/titulo/:titulo",[isAuth], eliminarLibroTitulo);
librosRouter.put("/:id",[isAuth],upload.single("caratula"), actulizarLibro);

module.exports=librosRouter;