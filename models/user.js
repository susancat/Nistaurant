const Pool = require('pg').Pool
const keys = require('../config/keys');

const pool = new Pool({
    user: keys.user,
    host: keys.host,
    database: keys.database,
    password: keys.password,
    port: keys.port
});

const getUser = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM users WHERE googleid = $1',[id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0]);
    })
  }) 
}

const createUser = (id, name) => {
    return new Promise(function(resolve, reject){
        pool.query('INSERT INTO users (googleid, name) VALUES ($1, $2) RETURNING *', [id, name], (error, results) => {
            if(error){
                reject(error)
            }
            resolve(`A new user has been added: ${results.rows[0]}`)
        })
    })
}

//----------------another method: post directly from routes file

const deleteUser = (id) => {
    return new Promise(function(resolve, reject) {
      pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`User deleted with googleid: ${id}`)
      })
    })
  }

module.exports = {
  getUser,
  createUser,
  deleteUser
}