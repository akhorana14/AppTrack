import express from "express";

const router = express.Router();
export default router;

router.get('/', (req, res) => {
    res.send('Invalid Query')
})

