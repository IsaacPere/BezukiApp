require('dotenv').config()

const wageni_service = require("express")

const wageni_routers = wageni_service.Router()

const social_media_login = require(
    "../WageniPortal/CompanyBackend/WageniSocialMedia/SocialMediaLogic")

wageni_routers.get('/', function(wageni_request, wageni_respond){
    wageni_respond.send("Hello Wageni Portal")
})

wageni_routers.use('/login', social_media_login)

module.exports = wageni_routers