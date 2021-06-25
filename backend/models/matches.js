const mongoose = require("mongoose");
const Joi = require("joi");

//Schema
const MatchesSchema = new mongoose.Schema({
  city: String,
  date: Date,
  teamA: String,
  teamB: String,
});

//Validation Functions Sign up Matches info
MatchesSchema.statics.validate = async function (RequestedBody) {
  //  Validating
  return validateMatches(RequestedBody);
};
//Function
function validateMatches(Matches) {
  // Designing JOI Validation schema
  const schema = Joi.object({
    city: Joi.string().required(),
    teamA: Joi.string().required(),
    teamB: Joi.string().required(),
    id: Joi.string().required(),
    date: Joi.date().required(),
  });

  return schema.validate(Matches, { abortEarly: false });
}

MatchesSchema.set("toJSON", { virtuals: true });
const MatchesModel = mongoose.model("matches", MatchesSchema);
module.exports = MatchesModel;
