import sequelize from "./../utility/sequelize.js";
import Model from "./../models/model.js";
import Controller from "./controller.js";

const getList = async (req, res, token) => {
  const pageSize = req.body.pageSize;
  const page = req.body.page;
  const matches = [];

  try {
    const articles = await Model.article.findAll({
      attributes: ['title', 'id']
    });
    const sortedArticles = articles.sort((a, b) => a.dataValues.id > b.dataValues.id);

    sortedArticles.forEach((item, index) => {
      const matchItem = {
        title: item.dataValues.title,
        id: item.dataValues.id
      }

      if (index >= (page - 1) * pageSize && index < page * pageSize) {
        matches.push(matchItem)
      }

    });

    const result = {
      list: matches,
      meta: {
        pageSize: pageSize,
        pageCount: Math.ceil(articles.length / pageSize),
        page: page,
        count: articles.length,
      },
    };

    Controller.useToken(token, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(503).send("Failed to retrieve the articles. Please try again.");
  }
};

export default getList;