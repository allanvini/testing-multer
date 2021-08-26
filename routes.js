const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const stream = require('stream');

const upload = multer({ dest: './images' });

router.post('/api/images/upload', upload.single('logo'), async (request, response) => {
    return response.status(200).send({ imageLink: `http://localhost:4001/api/images/${request.file.filename}` });
});

router.get('/api/images/:img', async (request, response) => {
    const { img } = request.params;
    const imageStream = fs.createReadStream(`./images/${img}`);
    const passThrough = new stream.PassThrough();
    stream.pipeline(
        imageStream,
        passThrough,
        (err) => {
            if (err) {
                console.log(err);
                return response.status(400);
            }
        }
    )
    passThrough.pipe(response);
});

module.exports = router;