const AdminModel = require("../models/admin");

module.exports = async function (req, res, next) {
  const admin = await AdminModel.findById(req.body.id);
  if (!admin) return res.status(400).send("Your Are NOT Authorized");
  req.isValidated = true;
  next();
};
