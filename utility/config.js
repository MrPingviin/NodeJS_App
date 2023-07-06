const dotenv = require("dotenv");
dotenv.config();

exports.Config = {
  defaultRemaining: process.env.DEFAULT_TOKEN_REMAINING,
  minTitleLength: process.env.MIN_TITLE_LENGTH,
  maxTitleLength: process.env.MAX_TITLE_LENGTH,
  minDescriptionLength: process.env.MIN_DESCRIPTION_LENGTH,
  maxDescriptionLength: process.env.MAX_DESCRIPTION_LENGTH,
  validPlatforms: process.env.VALID_PLATFORMS,
};
