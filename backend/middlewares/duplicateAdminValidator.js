const AdminModel = require("../models/admin");
module.exports = async function (req, res, next) {
  const manager = await AdminModel.findOne({ email: req.body.email });
  if (manager) return res.status(400).send("Admin already existed");
  req.isValidated = true;
  next();
};
