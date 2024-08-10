const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


main().then(() =>{
    console.log("connection success");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
};


let allChats = [
{
    from: "bunny",
    to: "Raju",
    message: "hi raju when are coming to hostel rah",
    created_at: new Date()
},
{
    
    from: "banuprakash",
    to: "ajay",
    message: "hi ajay when are coming to hostel rah",
    created_at: new Date()

},
{
    
    from: "laxman",
    to: "sriteja",
    message: "hi sriteja tiffin ready ga petu",
    created_at: new Date()
},
];

Chat.insertMany(allChats);

