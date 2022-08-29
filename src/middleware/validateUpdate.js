const { User } = require('../database/models');

const updateValide = async (req, res, next) => {
  const { auth } = req;
  const { title, content } = req.body;
  const { id } = await User.findOne({ where: { email: auth } });
  if (Number(id) !== Number(req.params.id)) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  if (title.length <= 0 || content.length <= 0) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = {
  updateValide,
};
