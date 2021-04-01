const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Please send a POST request to /encoder with the encoding and data to get encode data")
})

router.post('/', (req, res) => {
    const data = req.body
    var originalData = data['original']
    var method = data['enc']
    var encoded = ""
    try {
        if (method == "base16") {
            encoded = originalData.toString(16)
        } else if (method == "base32") {
            const b32 = require('base32')
            encoded = b32.encode(originalData)
        } else if (method == "base64") {
            encoded = Buffer.from(originalData, "utf-8").toString(method)
        } else if (method == "base58") {
            const b58 = require('base-58')
            encoded = b58.encode(Buffer.from(originalData, "utf-8"))
        }
        res.send({
            encoded: encoded
        }, 200)
    } catch (e) {
        console.log(e)
        res.send({
            error: "Invalid Encoding"
        }, 400)
    }
    
})

module.exports = router