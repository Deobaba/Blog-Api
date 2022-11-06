const express = require('express')
const path = require("path");
const {Home, Homeview } = require('../controller/blogs')
const router = express.Router()




router.route('/')
    .get(Home)

router.route('/view')
    .get(Homeview)



module.exports = router