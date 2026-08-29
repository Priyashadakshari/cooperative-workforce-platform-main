const router = require("express").Router();
const Worker = require("../models/Worker");

router.post("/", async (req, res) => {
    try {
        const worker = await Worker.create(req.body);
        res.json(worker);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const worker = await Worker.findById(req.params.id);

        if (!worker) {
            return res.status(404).json({ error: "Worker not found" });
        }

        res.json(worker);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const worker = await Worker.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(worker);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;