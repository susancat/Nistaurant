const Pool = require('pg').Pool
const pool = new Pool({
    user:'irenez',
    host:'localhost',
    database:'irenez',
    password:'8ftfdc57R!',
    port:5432
});

const getImage = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT FROM images WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const createImage = (body) => {
    return new Promise(function(resolve, reject){
        const { name, image } = body
        pool.query('INSERT INTO images (name, image) VALUES ($1,$2) RETURNING *', [name,image], (error, results) => {
            if(error){
                reject(error)
            }
            resolve(`A new image has been added: ${results.rows[0]}`)
        })
    })
}

const deleteImage = (id) => {
    return new Promise(function(resolve, reject) {
      pool.query('DELETE FROM images WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Image deleted with ID: ${id}`)
      })
    })
  }

module.exports = {
    getImage,
    createImage,
    deleteImage
}