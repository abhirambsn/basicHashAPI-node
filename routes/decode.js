const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Please send a POST request to /decoder with the encoding (base16, base32, base58) and data to get encode data")
})

router.post('/', (req, res) => {
    const data = req.body
    var encodedData = data['encoded']
    var method = data['enc']
    var decoded = ""
    try {
        if (method == "base16") {
            decoded = encodedData.toString(16)
        } else if (method == "base32") {
            const b32 = require('base32')
            decoded = b32.decode(encodedData)
        } else if (method == "base64") {
            decoded = Buffer.from(encodedData, method).toString("utf-8")
        } else if (method == "base58") {
            const b58 = require('base-58')
            decoded = String.fromCharCode.apply(null, b58.decode(encodedData))
        }
        res.send({
            encoded: encodedData,
            encoding: method,
            decoded: decoded
        })
    } catch (e) {
        res.send({
            error: "Invalid Encoding"
        })
    }
    
})

module.exports = router