const Pool = require('pg').Pool
const keys = require('../config/keys');

const pool = new Pool({
    user: keys.user,
    host: keys.host,
    database: keys.database,
    password: keys.password,
    port: keys.port
});

const getRoom = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM rooms WHERE id = $1',[id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows[0]);
    })
  }) 
}

const createRoom = (id, name) => {
    return new Promise(function(resolve, reject){
        pool.query('INSERT INTO rooms (id, name) VALUES ($1, $2) RETURNING *', [id, name], (error, results) => {
            if(error){
                reject(error)
            }
            resolve(`A new user has been added: ${results.rows[0]}`)
        })
    })
}

//----------------another method: post directly from routes file

const deleteRoom = (id) => {
    return new Promise(function(resolve, reject) {
      pool.query('DELETE FROM rooms WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`User deleted with googleid: ${id}`)
      })
    })
  }

module.exports = {
  getRoom,
  createRoom,
  deleteRoom
}