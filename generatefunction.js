var faker = require("faker");
var _ = require("lodash");
var moment = require("moment");

module.exports = {
  varcharGenerate: {
    handler: () => {
      return faker.random.uuid();
    }
  },

  bigintGenerate: {
    handler: () => {
      return (
        Date.now() +
        faker.random.number({ min: 1, max: 49 }) *
          faker.random.number({ min: 999999999999, max: 1234567894678456 })
      );
    }
  },
  intGenerate: {
    handler: () => {
      return (
        faker.random.number({ min: 1, max: 12345 }) +
        faker.random.number({ min: 234343, max: 234342 }) +
        faker.random.number({ min: 10000, max: 20000 })
      );
    }
  },
  tinyintGenerate: {
    handler: () => {
      return faker.random.number({ min: 0, max: 254 });
    }
  },
  datetimeGenerate: {
    handler: () => {
      return moment(Date.now() + faker.random.number() * 345).format(
        "YYYY-MM-DD hh:mm:ss"
      );
    }
  },
  longtextGenerate: {
    handler: () => {
      return faker.lorem.words(9);
    }
  }
};
