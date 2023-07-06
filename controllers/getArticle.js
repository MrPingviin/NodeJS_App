const sequalize = require("./../utility/sequalize");

exports.getArticle = async (req, res) => {
  const id = req.body.id;
  const token = req.headers("Authorization");

  try {
    const article = await sequalize.query(
      "SELECT * FROM Articles WHERE ID = :id",
      {
        replacements: {
          id: id,
        },
      }
    );

    res.status(200).json(article);
  } catch (error) {
    res.status(503).send("Failed to retrieve the article. Please try again.");
  }
};
