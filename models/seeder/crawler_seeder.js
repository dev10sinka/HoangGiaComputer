const seeder = require("mongoose-seed");
const dotenv = require('dotenv');
dotenv.config();

let itemsUser = [{
  username: 'admin',
  password: '$2b$08$wOsX3.caipOB66CGB7O0kuKQHIoqNHln3cFR5oCsJxSgLPzq5Vok.',
  email: 'admin@gmail.com',
  timeCreate: '2021/06/18 13:28:35',
  role: 'admin'
}];


let data = [
  {
    model: "User",
    documents: itemsUser,
  },
];

// connect mongodb
seeder.connect(`${process.env.DB_URL}`, function () {
  seeder.loadModels([
    "models/users.model",
  ]);
  seeder.clearModels(['User'], function () {
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });
  });
});
