import Utility from "./../utility/utility.js";

const lengthChecker = (
  req
) => {
  return (
    req.body.title.length >= Utility.config.minTitleLength &&
    req.body.title.length <= Utility.config.maxTitleLength &&
    req.body.description.length >= Utility.config.minDescriptionLength &&
    req.body.description.length <= Utility.config.maxDescriptionLength
  );
};

export default lengthChecker;