const express = require('express');
const router = express.Router();
const Room = require('../models/db');

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
router.get('/',async(req,res) => {
  try {
    const allRooms = await Room.query("SELECT * FROM rooms");
    res.json(allRooms.rows);
  } catch (err) {
    console.error(err.message)
  }
})

router.post('/', async(req,res) => {
  try {
    const { name,description,price,tourists,bedrooms,bathrooms,location,address,hostid,smoking,pets,wifi,entirehome, dryer,washer} = req.body;
    const newRoom = await Room.query(
      "INSERT INTO rooms (name,description,price,tourists,bedrooms,bathrooms,location,address,hostid,smoking,pets,wifi,entirehome, dryer,washer) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING *",[name,description,price,tourists,bedrooms,bathrooms,location,address,hostid,smoking,pets,wifi,entirehome, dryer,washer]);
    res.json(newRoom.roms[0])
  } catch (err) {
    console.error(err.message)
  }
})

//it won't work if no async/await
router.get('/:id', async (req,res) => {
  try {
    const { id } = req.params;
    const room = await Room.query("SELECT * FROM rooms WHERE id = $1",[id]);
    res.json(room.rows[0]);
  } catch (err) {
    console.error(err.message)
  }
})

// router.put('/:id', async(req,res) => {
//   try {
//     const { id } = req.params;
//     const { name,description,price,tourists,bedrooms,bathrooms,location,address,hostid,smoking,pets,wifi,entirehome, dryer,washer } = req.body;
//     const updateRoom = await Room.query(
//       "UPDATE rooms SET properties = $1 WHERE id = $2",[name,description,price,tourists,bedrooms,bathrooms,location,address,hostid,smoking,pets,wifi,entirehome, dryer,washer, id]
//     );
//     //$2 is just a var placeholder
//     res.json("Room has updated")
//   }catch (err) {
//     console.error(err.message)
//   }
// })

router.delete('/:id', async(req,res) => {
  try {
    const { id } = req.params;
    await Room.query(
      "DELETE FROM rooms WHERE id = $1",[id]
    );
    res.json("The room was deleted")
  } catch (err) {
    console.error(err.message)
  }
})

router.get('/:id/comments',async(req,res) => {
  try {
      const { id } = req.params;
      console.log(req.params.id)
      const allComments = await Room.query("SELECT * FROM comments WHERE roomid = $1",[id]);
      res.json(allComments.rows);
  } catch (err) {
      console.error(err.message)
  }
})
module.exports = router;