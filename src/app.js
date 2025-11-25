require('dotenv').config()

const bezuki_framework = require("express")

const the_subdomain = require("express-subdomain")

const services_port = process.env.BEZUKI_PORTAL_DETAILS || 8200

const wageni_systems = require("../src/WageniPortal/wageniportal")
const kampuni_systems = require("../src/CompanyPortal/companyportal")

const services_app = bezuki_framework()

services_app.use(the_subdomain('theadmin.local', kampuni_systems))

services_app.get('/', (service_request, service_respond) => {
    service_respond.send("Hello World")
})

services_app.use('/vistors', wageni_systems)

services_app.listen(services_port)