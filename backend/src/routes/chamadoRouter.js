const express = require("express");
const ChamadoController = require("../controllers/chamadoController")
const { validateNewChamado } = require("../middlewares/validationMiddleWare")

const chamadoRouter = express.Router()
const chamadoController = new ChamadoController()

chamadoRouter.get("/", (req, res, next) => chamadoController.getChamado(req, res, next))
chamadoRouter.post("/create", validateNewChamado, (req, res, next) => chamadoController.createChamado(req, res, next))

module.exports = chamadoRouter