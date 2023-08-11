
require('dotenv').config()
const mongoose = require('mongoose');



async function main() {
    
  // await mongoose.connect('mongodb://127.0.0.1:27017/musicplayer');
  await mongoose.connect(process.env.MONGO_URL).then(()=>{console.log("connection")}).catch((err)=>{console.log(err)});

}

module.exports= main;

