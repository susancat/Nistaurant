const express = require('express');
const router = express.Router();
const Comments = require('../models/db');

router.get('/',async(req,res) => {
    try {
        const { id } = req.params;
        console.log(req.params.id)
        const allComments = await Comments.query("SELECT * FROM comments WHERE roomid = $1",[id]);
        res.json(allComments.rows);
    } catch (err) {
        console.error(err.message)
    }
  })

module.exports = router;