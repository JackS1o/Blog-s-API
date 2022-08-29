const Service = require('../service/blogPostService');

const addPost = async (req, res) => {
  const { body } = req;
  const { auth } = req;
  const result = await Service.addPost(body, auth);
  return res.status(201).json(result);
};

const getPost = async (req, res) => {
  const result = await Service.getPost();
  return res.status(200).json(result);
};

module.exports = {
  addPost,
  getPost,
};
