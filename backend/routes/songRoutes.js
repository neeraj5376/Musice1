const express=require("express");

const router=express.Router();

const upload=require("../middleware/upload");

const {
    uploadSong,
    getSongs
}=require("../controllers/songController");

router.post(
    "/upload",
    upload.fields([
        {
            name:"image",
            maxCount:1
        },
        {
            name:"audio",
            maxCount:1
        }
    ]),
    uploadSong
);

router.get("/",getSongs);

module.exports=router;