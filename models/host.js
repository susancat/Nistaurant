const Pool = require('pg').Pool
const pool = new Pool({
    user:'irenez',
    host:'localhost',
    database:'irenez',
    password:'8ftfdc57R!',
    port:5432
});

const getHosts = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM hosts ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createHost = (body) => {
    return new Promise(function(resolve, reject){
        const { name } = body
        pool.query('INSERT INTO hosts (name) VALUES ($1) RETURNING *', [name], (error, results) => {
            if(error){
                reject(error)
            }
            resolve(`A new host has been added: ${results.rows[0]}`)
        })
    })
}

const deleteHost = (id) => {
    return new Promise(function(resolve, reject) {
      pool.query('DELETE FROM hosts WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Host deleted with ID: ${id}`)
      })
    })
  }

module.exports = {
  getHosts,
  createHost,
  deleteHost
}