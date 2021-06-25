module.exports = async function (req, res, next) {
  if (req.body.teamA === req.body.teamB)
    return res.status(400).send("Team A and B can not be same");
  req.isValidated = true;
  next();
};
