const axs = require('axios')

const axios = axs.create({
    baseURL: 'https://temp-token-backend.herokuapp.com',
})

module.exports = axios