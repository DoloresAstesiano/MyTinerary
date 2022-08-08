require('dotenv').config()
require('./config/database')
const express = require("express")

const Router = require("./routes/routes")
const PORT = 4000
const cors = require("cors")
const passport= require('passport')

const app = express()

//middlewares:
app.set("port", PORT)
app.use(cors())
app.use(express.json())//Para cualquier tipo de peticion 
app.use (passport.initialize())
app.use("/api", Router)

app.get("/", (req, res) => {
    res.send("Holaaa")
})
app.listen(PORT, () => {
    console.log("SERVIDOR CORRIENDO EN PUERTO:" + app.get("port"))
})

