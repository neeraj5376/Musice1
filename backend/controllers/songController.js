const Song=require("../models/Song");

exports.uploadSong=async(req,res)=>{

    try{

        const {title,artist}=req.body;

        const image=req.files.image[0].filename;

        const audio=req.files.audio[0].filename;

        const song=await Song.create({

            title,
            artist,
            image,
            audio

        });

        res.status(201).json(song);

    }

    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

};


exports.getSongs=async(req,res)=>{

    try{

        const songs=await Song.find().sort({createdAt:-1});

        res.json(songs);

    }

    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

};
exports.uploadSong = async (req, res) => {
  try {
    const { title, artist, genre } = req.body;

    const song = await Song.create({
      title,
      artist,
      genre,
      image: req.files.image[0].filename,
      audio: req.files.audio[0].filename,
    });

    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};