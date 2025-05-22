const mongoose =  require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
async function main(){
    mongoose.connect("mongodb://localhost:27017/wanderlust");
}
main()
    .then(()=>{
        console.log("connected");
    })
    .catch(()=>{
        console.log("error");
    })
const initDb = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data sent");
    
}
initDb();