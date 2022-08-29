const { BlogPost, User } = require('../database/models');

const updateValide = async (req, res, next) => {
  const { auth } = req;
  const post = await BlogPost.findOne({ where: { id: req.params.id } });
  if (!post) return res.status(404).json({ message: 'Post does not exist' });
  const { id } = await User.findOne({ where: { email: auth } });

  if (Number(post.userId) !== Number(id)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  next();
};

const updateBody = async (req, res, next) => {
  const { title, content } = req.body;
  if (title.length <= 0 || content.length <= 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = {
  updateValide,
  // updateValide2,
  updateBody,
};
