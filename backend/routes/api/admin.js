var express = require("express");
const AdminValidator = require("../../middlewares/AdminValidator");
const duplicateAdminValidator = require("../../middlewares/duplicateAdminValidator");
const AdminModel = require("../../models/admin");
var router = express.Router();

router.get("/", async (req, res) => {
  try {
    let Admin = await AdminModel.find();
    res.status(200).send(Admin);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all Admin!");
  }
});

/* GET Admins listing. */
router.get("/:id", async (req, res) => {
  try {
    let Admin = await AdminModel.findById(req.params.id);
    res.status(200).send(Admin);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting User Admin!");
  }
});

router.post("/", AdminValidator, duplicateAdminValidator, async (req, res) => {
  try {
    console.log(req.body);
    let Admin = new AdminModel({ ...req.body });
    Admin = await Admin.save();
    res.status(200).send(Admin);
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Adding Admin!");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await AdminModel.findByIdAndDelete(req.params.id);
    res.status(200).send("Admin is Deleted!");
  } catch (err) {
    console.log(err);
    res.status(400).send("Error in Getting all Admin!");
  }
});

module.exports = router;
