const mongoose = require("mongoose");
const validator=require("validator");
//connection creation
mongoose
  .connect("mongodb://127.0.0.1:27017/channel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successful..."))
  .catch((err) => console.log(err));

//Schema-- defnes the structure of documents, default values, validators etc.
const playListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength:2,
    lowercase:true,
    trim:true
  },
  ctype: {
    type:String,
    required:true,
    enum:["Frontend","Backend","Database"]
  },
  videos: {
    type:Number,
    validate(value){
        if(value<0){
            throw new Error("Videos count should not be negative");
        }
    } 
    // validate:{
    //     validator:function(value){
    //         return value.length<0
    //     },
    //     message:"Videos count should not be negative"
    // } this method is not working properly
},
  author: String,
  email:{
    type:String,
    required:[true,"Email is required"],
    unique:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("Invalid email")
        }
    }
  },
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

//mongoose model--- collection creation
const Playlist = new mongoose.model("Playlist", playListSchema);

// //create or insert document by Promise
// const reactPlaylist=new Playlist({
//     name:"React JS",
//     ctype:"Frontend",
//     videos:80,
//     author:"ChannelMaster",
//     active:true
// })
// reactPlaylist.save();

//create or insert document by async await - modern way
const createDocument = async () => {
  try {
    // const jsPlaylist = new Playlist({
    //   name: "JavaScript",
    //   ctype: "Frontend",
    //   videos: 150,
    //   author: "ChannelMaster",
    //   active: true,
    // })
    // const mongoPlaylist = new Playlist({
    //     name: "MongoDB",
    //     ctype: "Database",
    //     videos: 10,
    //     author: "ChannelMaster",
    //     active: true,
    //   });
    //   const mongoosePlaylist = new Playlist({
    //     name: "Mongoose JS",
    //     ctype: "Database",
    //     videos: 5,
    //     author: "ChannelMaster",
    //     active: true,
    //   });
    //   const expressPlaylist = new Playlist({
    //     name: "Express JS",
    //     ctype: "Backend",
    //     videos: 20,
    //     author: "ChannelMaster",
    //     active: true,
    //   });
      const express1Playlist = new Playlist({
        name: "     Express 3",
        ctype: "Backend",
        videos: 15,
        email:"abcd@gmail.com",
        author: "ChannelMaster",
        active: true,
      });
    const result = await Playlist.insertMany([express1Playlist])//([jsPlaylist,mongoPlaylist,mongoosePlaylist,expressPlaylist]);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

createDocument();

//read document
// const getDocument=async ()=>{
//     const result=await Playlist.find();
//     console.log(result)
// }


// only frontend type
// const getDocument=async ()=>{
//     try{
//     const result=await Playlist
//     .find({ctype:{$nin : ["Backend","Database"]}}).select({name:1})
//     console.log(result)
//     }catch(err){
//         console.log(err);
//     }
// }
// const getDocument=async ()=>{
//     try{
//     const result=await Playlist
//     .find({$and:[{ctype:"Backend"},{author:"ChannelMaster"}]}).select({name:1}).count();
//     console.log(result)
//     }catch(err){
//         console.log(err);
//     }
// }
//sort 
// const getDocument=async ()=>{
//     try{
//     const result=await Playlist
//     .find({author:"ChannelMaster"}).select({name:1}).sort({name:-1});//-1 descending order, 1 ascending order
//     console.log(result)
//     }catch(err){
//         console.log(err);
//     }
// }
// getDocument();

//comparison operators
//1--$in , 2--$nin(not in) , 3--$gt(greater than), 4--$gte , 5--$lt, 6--$lte

//logical operators---1-$and $or $nor $not


//update document
// const updateDocument=async(_id)=>{
//     try{
//         const result=await Playlist.findByIdAndUpdate({_id},//Playlist.updateOne({_id},
//             {$set:{name:"Express JS"}},{new:true})

//             console.log(result);
//     }catch(err){
//         console.log(err);
//     }
// }
// updateDocument("65376ac05a2c4f2ae29e445d");

// const deleteDocument=async(_id)=>{
//     try{
//         const result=await Playlist.findByIdAndDelete({_id})//Playlist.updateOne({_id},


//             console.log(result);
//     }catch(err){
//         console.log(err);
//     }
// }
// deleteDocument("65376ac05a2c4f2ae29e445d");