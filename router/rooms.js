const express = require('express');
const router = express.Router();
const Room = require('../models/room');

router.get('/', (req, res) => {
  Room.getRooms()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
//--------another method
// router.get('/',async(req,res) => {
//   try {
//     const allRooms = await Room.query("SELECT * FROM rooms");
//     res.json(allRooms.rows);
//   } catch (err) {
//     console.error(err.message)
//   }
// })

router.post('/', (req,res) => {
  Room.createRoom(req.body)
    .then(response => {
        res.status(200).send(response)
    })
    .catch(error => {
        res.status(500).send(error)
    })
})
//----another method
// router.post('/', async(req,res) => {
//   try {
//     const { all the propoties here } = req.body;
//     const newRoom = await Room.query(
//       "INSERT INTO rooms (all properties here) VALUES($1...) RETURNING *",
//       [all the properties here]
//     );
//     res.json(newRoom.roms[0])
//   } catch (err) {
//     console.error(err.message)
//   }
// })

router.get('/:id', async(req,res) => {
  try {
    const { id } = req.params;
    const room = await Room.query(
      "SELECT * FROM rooms WHERE id = $1",[id]
    );
    res.json(room.rows[0]);
  } catch (err) {
    console.error(err.message)
  }
})

// router.put('/:id', async(req,res) => {
//   try {
//     const { id } = req.params;
//     const { all the other properties updated here} = req.body;
//     const updateRoom = await Room.query(
//       "UPDATE rooms SET properties = $1 WHERE id = $2",[updated properties here, id]
//     );
//     //$2 is just a var placeholder
//     res.json("Room has updated")
//   }catch (err) {
//     console.error(err.message)
//   }
// })

router.delete('/:id', (req, res) => {
    // console.log(req.params.id)
    Room.deleteRoom(req.params.id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

// router.delete('/:id', async(req,res) => {
//   try {
//     const { id } = req.params;
//     const deleteRoom = await Room.query(
//       "DELETE FROM rooms WHERE id = $1",[id]
//     );
//     res.json("The room was deleted")
//   } catch (err) {
//     console.error(err.message)
//   }
// })
module.exports = router;