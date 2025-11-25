require('dotenv').config() 

const host_service = require("express")

const company_router= host_service.Router()
company_router.get('/', function(hosting_request, hosting_respond){
    hosting_respond.send("Hello Company Portal")
})

module.exports = company_router