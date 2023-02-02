var express = require('express');
var router = express.Router();
var activeMQ = require('../scripts/activeMQService');
const biddingModel = require('../models/activeMQBiddings');

/* GET home page. */
router.get('/', function (req, res, next) {
  const {
    readFileSync
  } = require('fs');
  const data = readFileSync('./products.json');
  products = JSON.parse(data);
  res.render('index', {
    title: 'Wine World',
    products: products
  });
});

router.post('/publish', async (req, res, next) => {
  var bidData = req.body;
  activeMQ.publish(JSON.stringify(bidData));
  bidData.lastUpdated = Date.now();
  var bidding = new biddingModel(bidData);
  try {
    await bidding.save();
    res.send(bidding);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;