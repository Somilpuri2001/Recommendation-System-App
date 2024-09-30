const express = require("express");
const { getRecommendationsController, fetchMovieData } = require("../Controllers/recommendationController");
const router = express.Router();

router.post("/getrecommendations",getRecommendationsController)
router.post("/getMovieDetails",fetchMovieData)

module.exports = router;