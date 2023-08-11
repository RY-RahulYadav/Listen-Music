const express = require("express")

const User = require('../modals/userSchema.js');
const passport = require("passport")
const passportLocalMongoose= require("passport-local-mongoose")

const Router = express.Router();



Router.post("/register",  (req, res)=> {
    const newUser= new User({
      name:req.body.name,
      username:req.body.username,
      email:req.body.email,
  
    });

    // const newUser = new User(req.body)
    
	  User.register(newUser , req.body.password  , (err , user)=>{
        if(err){
          console.log(err);
          res.status(400).send("invalid details , plz enter valid username and password ")
          
        }
        else{
          passport.authenticate("local")(req,res, async()=>{
      

            const userData=  await  User.findOne({username:req.body.username}).select('-password').exec()
            res.status(200).send(userData)
          })
        }
      })
      
    });
    
Router.post("/login" , (req , res )=>{
  
  
    passport.authenticate("local" )(req,res, async (err)=>{
     
     
      const userData=  await  User.findOne({username:req.body.username}).select('-password').exec()
      res.status(200).json(userData)
    })
  }
 )

Router.get("/logout", function(req, res){
  
  
  req.logout((err)=>{
    console.log(err)
  });
  res.send("logout")
  
});

Router.post("/createplaylist" , async (req,res)=>{

  //only require playlistname
 
  if(req.isAuthenticated()){
    try{

      const doc= await User.findOneAndUpdate({username:req.body.username}, {$push: {"playlist": {"playlistname":req.body.playlistName}}} , {new:true} )
     
      res.status(200).json(doc)
    }
    catch{
      if(err){
        res.status(400).send("data not updated ")
      }
    }
    
    

   }
  
})

Router.delete("/deletePlaylist" , async (req,res)=>{
  //require only playlistName
  
  if(req.isAuthenticated()){
    try{

      const doc= await User.findOneAndUpdate({username:req.body.username}, {$pull: { "playlist" : {"playlistname":req.body.playlistName} }} ,{ new: true })
      
      res.status(200).send(doc)
    }
    catch(err){
      if(err){
        res.status(400).send("data not updated ")
      }
    }}})


Router.patch("/addSongInPlaylist" , async (req,res)=>{
  // only require playlistIndex,songId
  const playlist_index = req.body.playlistIndex
  
  if(req.isAuthenticated()) {
    try{

      const doc= await User.findOneAndUpdate({username:req.body.username}, {$push: { [`playlist.${playlist_index}.SongId`]: req.body.songId}} ,{ new: true })
      doc.save()
      res.status(200).json(doc)
    }
    catch{
      if(err){
        res.status(400).send("data not updated ")
      }
    }
    
    

   }
  
})
Router.delete("/deleteSongInPlaylist" , async (req,res)=>{
  // only require playlistName , songId
  const playlist_index = req.body.playlistIndex
 
 
  
  if(req.isAuthenticated()){
    try{

      const doc= await User.findOneAndUpdate({username:req.body.username}, {$pull: { [`playlist.${playlist_index}.SongId`]: req.body.songId}} ,{ new: true })
      
      res.status(200).json(doc)
    }
    catch(err){
      if(err){
        res.status(400).send("data not updated ")
      }
    }
    
    

   }
  
})

Router.get("/getUser" ,(req , res )=>{
  if(req.isAuthenticated()){
    
    res.status(200).json(req.user)
    

   }

   else{
    res.status(401).json({status:401})
   }
})



module.exports= Router