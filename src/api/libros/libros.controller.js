const { deleteFIle } = require("../../middlewares/delete");
const Libro = require("./libros.models");

const getAllLibros = async (req, res, next) => {
    try {
        const libros = await Libro.find();
        return res.json(libros)
    } catch (error) {
        return next(error);
    }
};

const getlibroById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const libro = await Libro.findById(id);
        if (!libro) {
            return res.json("no he podido encontrar ese libro, id inexistente");
        }

        return res.json(libro);
    } catch (error) {
        return next(error);
    }
}

const getByTitle = async (req, res, next) => {
    try {
        const { titulo } = req.params;
        const libro = await Libro.findOne({ titulo: titulo });
        return res.json(libro);
    } catch (error) {
        return next(error);
    }
}

const crearLibro = async (req, res, next) => {
    try {
        const newLibro = new Libro(req.body);
        if (req.file) {
            newLibro.caratula = req.file.path;
        }
        await newLibro.save();
        return res.json(newLibro);

    } catch (error) {
        return next(error)
    }
}

const eliminarLibro = async (req, res, next) => {
    try {
        const { id } = req.params;
        const libroEliminado = await Libro.findByIdAndDelete(id);
        return res.status(200).json(libroEliminado);
    } catch (error) {
        return next(error)
    }
}

const eliminarLibroTitulo = async (req, res, next) => {
    try {
        const { titulo } = req.params;
        const libroEliminado = await Libro.findOneAndDelete({ titulo: titulo });
        return res.status(200).json(libroEliminado);
    } catch (error) {
        return next(error);
    }
}


const actulizarLibro = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (req.file) {
            
            const oldLibro = await Libro.findById(id);
            if (oldLibro.caratula) {
                deleteFIle(oldLibro.caratula);
            }

            req.body.caratula = req.file.path;
        }
        const libroActualizado = await Libro.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(libroActualizado);
    } catch (error) {
        return next(error);
    }
}
module.exports = { getAllLibros, getlibroById, getByTitle, crearLibro, eliminarLibro, eliminarLibroTitulo, actulizarLibro };