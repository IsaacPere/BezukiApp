require("dotenv").config()

const { Pool } = require("pg")

const wageni_database = new Pool({
    host: process.env.BEZUKI_WAGENI_HOSTNAME_DETAILS,
    user: process.env.BEZUKI_WAGENI_USERNAME_DETAILS,
    password: process.env.BEZUKI_WAGENI_PASSWORD_DETAILS,
    database: process.env.BEZUKI_WAGENI_DATABASE_DETAILS,
    port: process.env.BEZUKI_WAGENI_PORT_DETAILS
})

module.export = wageni_database 