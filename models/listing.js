const mongoose = require('mongoose');

let listingSchema = new mongoose.Schema({
title:{
        type:String,
        required : true
    },
    description:{
        type:String
    },
    image:{
        type:String,
        default:"https://unsplash.com/photos/sunset-over-the-ocean-with-pink-and-orange-hues-WS_7qiveZ2Y",
        set:(v)=> v===""?"https://unsplash.com/photos/sunset-over-the-ocean-with-pink-and-orange-hues-WS_7qiveZ2Y":v
    },
    price:{
        type:Number
    },
    location:{
        type:String
    },
    country:{
        type:String
    }
});

let Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;