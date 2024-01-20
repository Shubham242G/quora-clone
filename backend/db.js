const mongoose = require('mongoose');
const url = 'mongodb://Shubham:Fenerbasche@ac-huh6tcp-shard-00-00.csdmxfy.mongodb.net:27017,ac-huh6tcp-shard-00-01.csdmxfy.mongodb.net:27017,ac-huh6tcp-shard-00-02.csdmxfy.mongodb.net:27017/quora-clone-MERN?ssl=true&replicaSet=atlas-10i9ea-shard-0&authSource=admin&retryWrites=true&w=majority'
module.exports.connect=()=>{
    mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('MongoDB connected succesfully')
    }).catch((error)=> console.log(error,'some server error occurred'))
}