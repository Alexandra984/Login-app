const express = require('express');
const router = express.Router();

// welcome page
router.get('/', (req, res) => {
    res.render('Welcome');
})



module.exports = router;