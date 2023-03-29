import express from "express";

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = express.Router();
export default router;

router.post("/create", jsonParser, (req: any, res: any) => {
    console.log(req.body);

    var status = "success"; 

    res.send({
        "status": status
    })
}); 