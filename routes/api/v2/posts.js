const express = require('express');

const router = express.Router();

const postsApi=require('../../../controller/api/v2/posts_api');

router.get('/',postsApi.index);

module.exports=router;