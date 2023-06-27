const mongoose = require("mongoose");
const config = require("../config/index");

require("../models/portfolio");
require("../models/blog");

exports.connect = () => {
  return mongoose.connect(config.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => console.error(err));
};
