const router = require('express').Router();

const userRouters = require('./user-routes');
const postRouters = require('./post-routes');

router.use('/users', userRouters);
router.use('/posts', postRouters);


module.exports = router;