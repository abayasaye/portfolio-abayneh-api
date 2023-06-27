const mongoose = require("mongoose");
const config = require("../config/prod");

const fakeDB = require("./FakeDB");

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async (err) => {
  if (err) {
    console.error(err);
  }
  {
    console.log("> Starting populating database...");
    await fakeDB.populate();
    await mongoose.connection.close();
    console.log("> DB has been populated...");
  }
});
