var express = require("express");
const isAdmin = require("../../middlewares/isAdmin");
const matchesTeamValidator = require("../../middlewares/matchesTeamValidator");
const MatchesValidator = require("../../middlewares/MatchesValidator");
const MatchesModel = require("../../models/matches");
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    let Matches = await MatchesModel.find();
    res.status(200).send(Matches);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all Matches!");
  }
});

/* GET Matchess listing. */
router.get("/:id", async (req, res) => {
  try {
    let Matches = await MatchesModel.findById(req.params.id);
    res.status(200).send(Matches);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting User Matches!");
  }
});

router.post(
  "/",
  MatchesValidator,
  matchesTeamValidator,
  isAdmin,
  async (req, res) => {
    try {
      console.log(req.body);
      let Matches = new MatchesModel({ ...req.body });
      Matches = await Matches.save();
      res.status(200).send(Matches);
    } catch (err) {
      console.log(err);
      res.status(400).send("Error in Adding Matches!");
    }
  }
);

router.delete("/:id", async (req, res) => {
  try {
    await MatchesModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Matches is Deleted!");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all Matches!");
  }
});

module.exports = router;
