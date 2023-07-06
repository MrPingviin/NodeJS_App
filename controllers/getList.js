const sequalize = require("./../utility/sequalize");

exports.getList = async (req, res) => {
  const pageSize = req.body.pageSize;
  const page = req.body.page;

  try {
    const articles = await sequalize.query("SELECT * FROM Articles", {
      replacements: {},
    });

    const pagin = array.slice((page - 1) * pageSize, page * pageSize);

    const result = {
      list: pagin,
      meta: {
        pageSize: pageSize,
        pageCount: Math.ceil(articles.length / pageSize),
        page: page,
        count: articles.length,
      },
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(503).send("Failed to retrieve the articles. Please try again.");
  }
};
