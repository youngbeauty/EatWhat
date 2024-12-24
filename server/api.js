/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
const foodDatabase = [
  {
    id: 1,
    type: "蔬菜",
    name: "西兰花炒牛肉",
    description: "富含蛋白质和维生素C",
    image: "/placeholder.svg?height=200&width=200",
    nutritionalValue: "高蛋白,高纤维",
  },
  {
    id: 2,
    type: "蔬菜",
    name: "三文鱼沙拉",
    description: "富含omega-3脂肪酸",
    image: "/placeholder.svg?height=200&width=200",
    nutritionalValue: "高蛋白,高不饱和脂肪酸",
  },
  {
    id: 3,
    type: "蔬菜",
    name: "藜麦鸡肉碗",
    description: "全面的营养餐",
    image: "/placeholder.svg?height=200&width=200",
    nutritionalValue: "高蛋白,高纤维,富含矿物质",
  },
  {
    id: 4,
    type: "蔬菜",
    name: "番茄蛋汤",
    description: "简单而营养",
    image: "/placeholder.svg?height=200&width=200",
    nutritionalValue: "高维生素C,中等蛋白质",
  },
  {
    id: 5,
    type: "蔬菜",
    name: "全麦面包配鳄梨",
    description: "健康的碳水化合物和好脂肪",
    image: "/placeholder.svg?height=200&width=200",
    nutritionalValue: "高纤维,健康脂肪",
  },
];

router.get("/foods", (req, res) => {
  res.send(foodDatabase);
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
