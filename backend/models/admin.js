const mongoose = require("mongoose");
const Joi = require("joi");

//Schema
const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//Validation Functions Sign up Admin info
AdminSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateAdmin(RequestedBody);
};
//Function
function validateAdmin(Admin) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(Admin, { abortEarly: false });
}

AdminSchema.set("toJSON", { virtuals: true });
const AdminModel = mongoose.model("Admin", AdminSchema);
module.exports = AdminModel;
