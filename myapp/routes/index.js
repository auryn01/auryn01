var express = require('express');
var router = express.Router();

/* GET articles JSON response */
router.get('/', function(req, res, next) {
  res.json({
    data: [
      {
        type: "articles",
        id: "1",
        attributes: {
          title: "JSON: API paints my bikeshed!",
          body: "The shortest article. Ever.",
          created: "2015-05-22T14:56:29.000Z",
          updated: "2015-05-22T14:56:28.000Z"
        }
      }
    ]
  });
});

module.exports = router;
