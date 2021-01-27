const express = require("express");
const router = express.Router();
const Item = require("../models/Item");

//Item Routes
router.get("/items", (req, res) => {
  const result = Item.find();
  if (!result) res.status(404).send("No data found");
  res.status(200).json(result);
});

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

module.exports = router;
