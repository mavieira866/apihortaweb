const express = require("express");

const router = express.Router();

router.get("/test", (req, res, next) => {
  res.status(200).send({
    Ambiente: process.env.NODE_ENV,
    Working: true
  });
});

router.get("/sensor-data/:id", (req, res, next) => {
  res.status(200).send({
    
  })
})

module.exports = router;
