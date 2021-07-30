const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sneakerSchema = new Schema({
        name: String,  
        ref: String,  
        size: Number,  
        description: String,  
        price: Number,  
        image: {
            type: String,
            default : "https://amq-mcq.dam.kering.com/m/20f59bf62d4eb598/Medium-553770WHGP79061_R.jpg"
        },
        category: {
            type: String,
            enum: ["men", "women", "kids"]
        },  
        id_tags: {type: Schema.Types.ObjectId, ref: "Tag"}
      
})

const Sneaker = mongoose.model('Sneaker', sneakerSchema)

module.exports = Sneaker