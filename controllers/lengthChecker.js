const Config = require("./../utility/config");

exports.lengthChecker = (
  req
) => {
  return (
    req.body.title.length >= Config.minTitleLength &&
    req.body.title.length <= Config.maxTitleLength &&
    req.body.description.length >= Config.minDescriptionLength &&
    req.body.description.length <= Config.maxDescriptionLength
  );
};
