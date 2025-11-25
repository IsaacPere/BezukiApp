require('dotenv').config()

const wageni_service = require("express")

const wageni_routers = wageni_service.Router()

wageni_routers.get('/', function(wageni_request, wageni_respond){
    wageni_respond.send("Hello Wageni Portal")
})

module.exports = wageni_routers