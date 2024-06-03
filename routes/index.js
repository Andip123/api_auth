const express = require('express');
const router = express.Router();
const auth = require('./auth');

router.get('/', (req, res) => {
    return res.status(200).json({
        status: true,
        message: 'welcome to auth api!',
        data: null
    });
});

router.use('/auth',auth)

module.exports = router