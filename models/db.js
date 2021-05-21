const Pool = require('pg').Pool
const keys = require('../config/keys');

const pool = new Pool({
    user: keys.user,
    host: keys.host,
    database: keys.database,
    password: keys.password,
    port: keys.port
});

const getRooms = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM rooms ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createRoom = (body) => {
    return new Promise(function(resolve, reject){
        const { name, email } = body
        pool.query('INSERT INTO rooms (name,description) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
            if(error){
                reject(error)
            }
            resolve(`A new room has been added: ${results.rows[0]}`)
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
        resolve(`Room deleted with ID: ${id}`)
      })
    })
  }

// module.exports = {
//   getRooms,
//   createRoom,
//   deleteRoom
// }
module.exports = pool;