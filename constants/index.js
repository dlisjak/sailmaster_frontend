const language = process.env.REACT_APP_LANGUAGE || 'si'
module.exports = require(`./${language}.js`)
