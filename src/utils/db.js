const mongoose = require("mongoose");
require("dotenv").config();


const LINK_DB = process.env.MONGO_DB;

const connectDB = async ()=>{
    try {
        mongoose.set("strictQuery", true);
        const db= await mongoose.connect(LINK_DB);
        const {host, name} = db.connection;
        console.log("Conectado con exito al host:"+ host);
    } catch (error) {
        console.log("no me puedo conectar a la DB", error);
    }
}

module.exports = {connectDB};