const express = require('express');

const router = express.Router();

const homePageController = require('../controller/home_controller');

router.get('/', homePageController.homePage);

router.use('/users',require('./users'));

router.use('/posts', require('./posts'));

router.use('/comments', require('./comments'));

router.use('/api',require('./api'));

module.exports = router;