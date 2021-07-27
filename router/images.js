const express = require('express');
const router = express.Router();
const Image = require('../models/db');

// router.get('/', (req, res) => {
//   Room.getRooms()
//   .then(response => {
//     res.status(200).send(response);
//   })
//   .catch(error => {
//     res.status(500).send(error);
//   })
// })
//--------another method
router.post('/', async(req,res) => {
  try {
    const { name,image,roomid } = req.body;
    const newImage = await Image.query(
      "INSERT INTO images (name,image,roomid) VALUES($1,$2,$3) RETURNING *",[name,image,roomid]);
    res.json(newImage.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

//it won't work if no async/await
router.get('/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const image = await Image.query("SELECT * FROM images WHERE id = $1",[id]);
    res.json(image.rows[0]);
  } catch (err) {
    console.error(err.message)
  }
})

router.delete('/:id', async(req,res) => {
  try {
    const { id } = req.params;
    await Image.query(
      "DELETE FROM images WHERE id = $1",[id]
    );
    res.json("The image was deleted")
  } catch (err) {
    console.error(err.message)
  }
})

module.exports = router;