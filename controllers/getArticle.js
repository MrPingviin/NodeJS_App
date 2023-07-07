import sequelize from "./../utility/sequelize.js";
import Model from "./../models/model.js";

const getArticle = async (req, res) => {
  const id = req.body.id;
  const token = req.header("Authorization");

  try {
    const article = await Model.article.findAll({
      where: {
        ID: id
      }
    })

    const result = {
      title: article[0].dataValues.title,
      description: article[0].dataValues.description,
      id: article[0].dataValues.id
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(503).send("Failed to retrieve the article. Please try again.");
  }
};

export default getArticle;