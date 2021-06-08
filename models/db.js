const Pool = require('pg').Pool
const keys = require('../config/keys');

const pool = new Pool({
    user: keys.user,
    host: keys.host,
    database: keys.database,
    password: keys.password,
    port: keys.port
});

module.exports = pool;