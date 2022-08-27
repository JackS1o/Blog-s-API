const Service = require('../service/blogPostService');

const addPost = async (req, res) => {
  const { body } = req;
  const { auth } = req;
  const result = await Service.addPost(body, auth);
  return res.status(201).json(result);
};

module.exports = {
  addPost,
};
