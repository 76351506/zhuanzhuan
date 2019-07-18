var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const bodyParserMidllware = bodyParser.urlencoded({ extended: false })

const { Login, Registry, Show, Update, Delete } = require('../controller/user')

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/user/login', bodyParserMidllware, Login)
router.post('/user/add', bodyParserMidllware, Registry)
router.post('/user/update', bodyParserMidllware, Update)
router.post('/user/delete', bodyParserMidllware, Delete)
router.get('/user/getUserList', Show)
module.exports = router;