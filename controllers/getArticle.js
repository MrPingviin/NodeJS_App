import sequelize from "./../utility/sequelize.js";
import Model from "./../models/model.js";
import Controller from "./controller.js";

const getArticle = async (req, res, token) => {
  const id = req.body.id;

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

    Controller.useToken(token, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(503).send("Failed to retrieve the article. Please try again.");
  }
};

export default getArticle;