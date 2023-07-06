const Models = require("../models");
const sequalize = require("./../utility/sequalize");

exports.createArticle = async (req, res) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const getResult = async () => {
    const matches = await sequelize.query(
      "SELECT * FROM Articles WHERE Title = :title AND Description = :description AND CreatedAt = :createdAt",
      {
        replacements: {
          title: req.body.title,
          description: req.body.description,
          createdAt: formattedDate,
        },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    const sortedMatches = matches.sort((a, b) => a.ID > b.ID);
    const result = sortedMatches[sortedMatches.length - 1];

    return result;
  };

  Models.Article.create({
    title: req.body.title,
    description: req.body.description,
  })
    .then((response) => {
      const sendResult = async () => {
        const result = await getResult();
        res.status(200).json(result);
      };
      sendResult();
    })
    .catch((error) => {
      res
        .status(503)
        .send("Failed to create the new article. Please try again.");
    });
};
