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

const getPostById = async (req, res) => {
  const { id } = req.params;
  const result = await Service.getPostById(id);
  if (!result) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(result);
};

module.exports = {
  addPost,
  getPost,
  getPostById,
};
