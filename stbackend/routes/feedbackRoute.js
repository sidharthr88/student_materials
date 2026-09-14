const express = require("express");
const router = express.Router();

const Feedback = require("../models/feedbackModel");


// Add Feedback
router.post("/add", async (req, res) => {

    try {

        console.log(req.body);

        const feedback = new Feedback(req.body);

        await feedback.save();

        res.status(201).json({
            message: "Feedback submitted successfully",
            feedback: feedback
        });

    } 
    catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

});


// Get All Feedback
router.get("/", async (req, res) => {

    try {

        const feedbacks = await Feedback.find();

        res.json(feedbacks);

    } 
    catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;