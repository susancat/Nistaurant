if (process.env.NODE_ENV === 'production') {
    //production mode
    module.exports = require('./prod');
} else {
    //dev mode
    module.exports = require('./dev');
}