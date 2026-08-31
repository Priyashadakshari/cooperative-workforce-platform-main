const router = require('express').Router();
const axios = require('axios');

const Request = require('../models/Request');
const Worker = require('../models/Worker');

router.post('/', async (req, res) => {
    try {
        const { rawText, customerId } = req.body;

        const aiResponse = await axios.post(
            `${process.env.AI_SERVICE_URL}/parse-request`,
            { text: rawText }
        );

        const { service, urgency } = aiResponse.data;

        const request = await Request.create({
            customerId,
            rawText,
            service,
            urgency
        });

        const matchingWorkers = await Worker.find({
            'skills.name': service,
            availability: true
        });

        res.json({
            request,
            recommendedWorkers: matchingWorkers
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: 'Failed to process request'
        });
    }
});

module.exports = router;