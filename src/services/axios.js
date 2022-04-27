const axs = require('axios')

const axios = axs.create({
    baseURL: 'https://temp-token-backend.herokuapp.com',
    // baseURL: 'http://localhost:4000',
})

module.exports = axios