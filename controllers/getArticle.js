import sequelize from "./../utility/sequelize.js";
import Model from "./../models/model.js";

const getArticle = async (req, res) => {
  const id = req.body.id;
  const token = req.headers("Authorization");

  try {
    const article = await Model.article.findAll({
      where: {
        id: id
      }
    })

    res.status(200).json(article);
  } catch (error) {
    res.status(503).send("Failed to retrieve the article. Please try again.");
  }
};

export default getArticle;