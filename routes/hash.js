const express = require('express')
const router = express.Router()
const crypto = require('crypto')


router.get('/', (req, res) => {
    res.send("Please send a POST request to /dohash with string and method to hash", 200);
})

router.post('/', (req, res) => {
    const data = req.body
    var originalData = data['original']
    var method = data['method']
    try {
        var hashr = crypto.createHash(method)
        var hashed = hashr.update(originalData).digest('hex')
        res.send({
            hash: hashed
        }, 200)
    } catch (e) {
        res.send({
            error: "Invalid Hash Type, please try again"
        }, 400)
    }
})

module.exports = router