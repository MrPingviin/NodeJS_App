exports.platformValidator = (req, validPlatforms) => {
  const platform = req.body.platform;
  if (platform === undefined) {
    return false;
  }

  const platformLowercase = platform.toLowerCase();
  return validPlatforms.includes(platformLowercase);
};
