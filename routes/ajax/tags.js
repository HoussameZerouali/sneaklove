const express = require("express");
const router = express.Router();

router.get('/filter/:id', async (res, req, next) => {

    try{
        console.log(req.params)
        const id = req.params.id
        const data = await Sneaker.find({id_tags: id})

        res.status(200).json(data)
    }
    catch(err){
        console.log('AJAX err', err)
        next(err)
    }
})

module.exports = router