require('dotenv').config() 

const host_service = require("express")

const host_router = host_service.Router()
host_router.get('/', function(hosting_request, hosting_respond){
    hosting_respond.send("Hello Host Portal")
})

module.exports = host_router