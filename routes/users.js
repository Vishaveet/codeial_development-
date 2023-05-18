const express = require('express')
const router = express.Router();

const passport = require('passport');

const usersController = require('../controller/users_controller');

// router.get('/profile',usersController.createSession)
router.get('/profile/:id',passport.checkAuthentication,usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create',usersController.create);

router.post('/update/:id', usersController.update);

// Use Passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'},
),usersController.createSession);

router.get('/sign-out', usersController.destroySession)

module.exports = router;