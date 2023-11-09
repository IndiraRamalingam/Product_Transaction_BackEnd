const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id:{
        type:String,
        required:true,
    },
    title: {
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    sold:{
        type:String,
        required:true
    },
    dateOfSale:{
        type:String,
        required:true
    },
    month:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Product', productSchema, 'products');