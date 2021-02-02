const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

//Item Routes
//get all
router.get("/items", (req, res) => {
  const result = Item.find();
  if (!result) res.status(404).send("No data found");
  res.status(200).json(result);
});

//create
router.post("/", async (req, res) => {
  const itemname = req.body.name;
  console.log(`recieved input: ${itemname}`);
  const newitem = new Item({name : itemname});
  if(!newitem) res.status(400).send("bad request")
  await newitem.save((err) => {
    if (err){
      console.log(err)
      res.status(400).send("couldnt save to db");
    }
    res.send("item saved");
  });
});

//get one
router.get("/:id", async (req, response) => {
  await Item.findById(req.params.id,(err,res)=>{
    if(err || !res){
      return response.send("no data found"+err).status(404)
    }
    return response.send(res).status(200)
  })
});

//delete one
router.get("/delete/:id", async (req, response) => {
  await Item.findByIdAndDelete(req.params.id,(err,res)=>{
    if(err){
      return response.send(err).status(404)
    }
    return response.send("document deleted").status(200)
  })
});

//update
router.put("/put/:id", async (req, response) => {
  await Item.findByIdAndUpdate(req.params.id,{name : req.body.name},(err,res)=>{
    if(err){
      return response.send(err).status(404)
    }
    return response.send("document updated").status(200)
  })
});


module.exports = router;
